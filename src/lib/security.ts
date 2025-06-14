
import DOMPurify from 'dompurify';

// Text sanitization
export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};

// Rate limiting (client-side)
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }
    
    const attempts = this.attempts.get(key)!;
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => time > windowStart);
    this.attempts.set(key, recentAttempts);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Generate a simple session ID for rate limiting
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('lufor-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('lufor-session-id', sessionId);
  }
  return sessionId;
};

// File validation helper
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: 'Filen får inte vara större än 10MB' };
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Endast bilder (JPEG, PNG, WebP) och videor (MP4, WebM) är tillåtna' };
  }
  
  // Check file name for suspicious patterns
  if (/[<>:"/\\|?*]/.test(file.name)) {
    return { isValid: false, error: 'Filnamnet innehåller otillåtna tecken' };
  }
  
  return { isValid: true };
};

// CSRF token generation (simple client-side implementation)
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

// Get or create CSRF token
export const getCSRFToken = (): string => {
  let token = sessionStorage.getItem('lufor-csrf-token');
  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem('lufor-csrf-token', token);
  }
  return token;
};
