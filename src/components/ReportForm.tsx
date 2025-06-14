import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, MapPin, Upload, Mic, Clock, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import CameraCapture from './CameraCapture';
import LocationCapture from './LocationCapture';
import WeatherWidget from './WeatherWidget';
import { reportFormSchema } from '@/lib/validation';
import { sanitizeText, rateLimiter, getSessionId, getCSRFToken } from '@/lib/security';
import StepDocument from './report/StepDocument';
import StepLocation from './report/StepLocation';
import StepDescription from './report/StepDescription';
import StepDetails from './report/StepDetails';
import StepContact from './report/StepContact';

interface ReportFormProps {
  mode: 'quick' | 'detailed';
  onBack: () => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const ReportForm = ({ mode, onBack, onSubmit, isSubmitting }: ReportFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    droneSize: '',
    droneColor: '',
    flightPattern: '',
    duration: '',
    numberOfDrones: '1',
    contactInfo: '',
    urgencyLevel: 'low'
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const maxSteps = mode === 'quick' ? 3 : 5;

  useEffect(() => {
    // Get battery level if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
      });
    }
  }, []);

  const validateField = (field: string, value: string) => {
    try {
      const fieldSchema = reportFormSchema.shape[field as keyof typeof reportFormSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setValidationErrors(prev => ({ ...prev, [field]: '' }));
      }
    } catch (error: any) {
      setValidationErrors(prev => ({ 
        ...prev, 
        [field]: error.errors?.[0]?.message || 'Ogiltigt värde' 
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Sanitize input
    const sanitizedValue = sanitizeText(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    // Validate field
    validateField(field, sanitizedValue);
  };

  const handleMediaCapture = (files: File[]) => {
    setMediaFiles(prev => [...prev, ...files]);
    if (mode === 'quick') {
      setStep(2);
    }
  };

  const handleLocationCapture = (coords: { lat: number; lng: number; accuracy: number }) => {
    setLocation(coords);
    if (mode === 'quick') {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    // Rate limiting check
    const sessionId = getSessionId();
    if (!rateLimiter.isAllowed(`report-${sessionId}`, 3, 300000)) { // 3 attempts per 5 minutes
      toast.error('För många rapporter', {
        description: 'Vänta 5 minuter innan du skickar en ny rapport.'
      });
      return;
    }

    // Validate form data
    try {
      reportFormSchema.parse(formData);
      setValidationErrors({});
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        errors[err.path[0]] = err.message;
      });
      setValidationErrors(errors);
      toast.error('Kontrollera formuläret', {
        description: 'Det finns fel i formuläret som måste åtgärdas.'
      });
      return;
    }

    const reportData = {
      ...formData,
      location,
      mediaFiles,
      timestamp: new Date().toISOString(),
      batteryLevel,
      reportMode: mode,
      deviceInfo: {
        userAgent: navigator.userAgent.substring(0, 200), // Limit user agent length
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`
      }
    };

    onSubmit(reportData);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepDocument
            mediaFiles={mediaFiles}
            onCapture={handleMediaCapture}
          />
        );
      case 2:
        return (
          <StepLocation
            location={location}
            onLocationCapture={handleLocationCapture}
          />
        );
      case 3:
        if (mode === 'quick') {
          return (
            <StepDescription
              description={formData.description}
              onChange={(desc) => handleInputChange('description', desc)}
              validationError={validationErrors.description}
              quickMode
            />
          );
        }
        return (
          <StepDescription
            description={formData.description}
            onChange={(desc) => handleInputChange('description', desc)}
            validationError={validationErrors.description}
          />
        );
      case 4:
        return (
          <StepDetails
            formData={formData}
            onChange={handleInputChange}
            validationErrors={validationErrors}
          />
        );
      case 5:
        return (
          <StepContact
            contactInfo={formData.contactInfo}
            onChange={(val) => handleInputChange('contactInfo', val)}
            validationError={validationErrors.contactInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant={mode === 'quick' ? 'default' : 'secondary'}>
                {mode === 'quick' ? 'Snabbrapport' : 'Detaljerad rapport'}
              </Badge>
              {batteryLevel && (
                <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-300">
                  <Battery className="w-4 h-4" />
                  <span>{batteryLevel}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Steg {step} av {maxSteps}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {Math.round((step / maxSteps) * 100)}% klart
            </span>
          </div>
          <Progress value={(step / maxSteps) * 100} className="h-2" />
        </div>

        {/* Form Content */}
        <div className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-lg backdrop-blur-md border border-blue-200/50 dark:border-slate-700/50">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Föregående
              </Button>
              
              {step < maxSteps ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && mediaFiles.length === 0) ||
                    (step === 2 && !location) ||
                    (step === 3 && mode === 'quick' && !formData.description.trim()) ||
                    (step === 3 && mode === 'detailed' && !formData.description.trim()) ||
                    Object.values(validationErrors).some(error => error)
                  }
                >
                  Nästa
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || 
                    !formData.description.trim() ||
                    Object.values(validationErrors).some(error => error)
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Skickar...
                    </>
                  ) : (
                    'Skicka Rapport'
                  )}
                </Button>
              )}
            </div>
          </div>
      </main>
    </div>
  );
};

export default ReportForm;
