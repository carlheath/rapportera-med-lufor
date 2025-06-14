const en = {
  header: {
    about: "About LUFOR",
    switchLanguage: "Switch to Swedish",
    reportBug: "Report a bug",
    logout: "Log out",
    login: "Log in",
    logoAlt: "LUFOR logo",
    menuAriaLabel: "Open menu"
  },
  indexPage: {
    heroTitle: "Observed a drone?",
    heroSubtitle: "Your report helps secure Sweden's airspace. Together, we create a safer national preparedness.",
    reportButton: "Report Drone"
  },
  toasts: {
    loggedOut: "You have been logged out.",
    reportError: "Error submitting report",
    reportErrorLocationMissing: "Location information (latitude and longitude) is mandatory.",
    reportSuccess: "Report sent!",
    reportSuccessDescription: "Thank you for your observation. Your report has been received.",
    genericError: "An error occurred: {{message}}. Please try again."
  },
  loginPage: {
    title: "Log in",
    description: "For authorized personnel only.",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    submitButton: "Log in",
    submitButtonLoading: "Logging in...",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up",
    loginFailed: "Login failed",
    loginSuccess: "Login successful!"
  },
  signUpPage: {
    title: "Create Account",
    description: "Fill in your details to sign up.",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    submitButton: "Create account",
    submitButtonLoading: "Registering...",
    hasAccount: "Already have an account?",
    loginLink: "Log in",
    signUpError: "Sign-up error",
    signUpSuccess: "Registration successful!",
    signUpSuccessDescription: "Please check your email to confirm your account."
  },
  aboutPage: {
    title: "About LUFOR",
    subtitle: "LUFOR is a platform for collecting, analyzing, and visualizing observations of unmanned aerial vehicles (drones) from the public. The purpose is to strengthen Sweden's national preparedness and situational awareness in the airspace.",
    p1: "By reporting your observations, you directly contribute to a safer and more secure environment. Each report is an important piece of the puzzle that helps authorities and other actors get a better picture of the activity in the airspace.",
    p2: "This application is developed within the SHIFT research program and is run by RISE - Research Institutes of Sweden, with a focus on user-friendliness and security. Your data is handled with the utmost confidentiality and is used only for the purpose of strengthening national security.",
    p3: "Thank you for your commitment!"
  },
  common: {
    back: "Back"
  },
  reportForm: {
    quickReport: 'Quick Report',
    detailedReport: 'Detailed Report',
    step: 'Step {{step}} of {{maxSteps}}',
    progress: '{{progress}}% complete',
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit Report',
    submitting: 'Submitting...',
    rateLimitErrorTitle: 'Too many reports',
    rateLimitErrorDescription: 'Please wait 5 minutes before submitting another report.',
    validationErrorTitle: 'Please check the form',
    validationErrorDescription: 'There are errors in the form that need to be corrected.',
    invalidValue: 'Invalid value',
    
    documentTitle: 'Document the Drone',
    documentSubtitle: 'Take photos or video of the drone for the best possible analysis',
    filesAdded: '{{count}} file(s) added',
    
    locationTitle: 'Location',
    locationSubtitle: 'Confirm your position for accurate reporting',
    
    quickDescriptionTitle: 'Quick Description',
    detailedDescriptionTitle: 'Detailed Description',
    quickDescriptionSubtitle: 'Briefly describe what you observed',
    detailedDescriptionSubtitle: 'Describe in detail what you observed',
    quickDescriptionLabel: 'Brief description',
    detailedDescriptionLabel: 'Detailed description',
    quickDescriptionPlaceholder: "E.g., 'Large black drone flying in circular patterns for 5 minutes'",
    detailedDescriptionPlaceholder: "Describe what you saw in as much detail as possible...",
    
    detailsTitle: 'Detailed Information',
    detailsSubtitle: 'Additional details for better analysis',
    sizeLabel: 'Estimated size',
    sizePlaceholder: 'Select size',
    sizeSmall: 'Small (< 25cm)',
    sizeMedium: 'Medium (25-100cm)',
    sizeLarge: 'Large (> 100cm)',
    colorLabel: 'Color',
    colorPlaceholder: 'E.g., black, white, gray',
    flightPatternLabel: 'Flight pattern',
    flightPatternPlaceholder: 'Select pattern',
    patternHovering: 'Hovering',
    patternCircular: 'Circular',
    patternLinear: 'Straight ahead',
    patternErratic: 'Erratic',
    durationLabel: 'Duration',
    durationPlaceholder: 'Select time',
    durationLt1m: 'Less than 1 minute',
    duration1to5m: '1-5 minutes',
    duration5to15m: '5-15 minutes',
    durationGt15m: 'More than 15 minutes',
    
    contactTitle: 'Contact Information (Optional)',
    contactSubtitle: 'For follow-up on the report',
    contactLabel: 'Email or phone number',
    contactPlaceholder: 'your.email@example.com or 070-123 45 67',
    contactGdpr: 'For follow-up only. Processed according to GDPR.',
    fileErrors: {
      fileTooLarge: 'File must not be larger than 10MB',
      invalidFileType: 'Only images (JPEG, PNG, WebP) and videos (MP4, WebM) are allowed',
      invalidFileName: 'File name contains invalid characters'
    }
  },
  statsOverview: {
    errorTitle: "Error fetching data",
    errorDescription: "Could not load statistics. Please try reloading the page.",
    recentActivityTitle: "Recent Activity",
    recentActivityDescription: "An overview of the latest incoming observations.",
    noRecentActivity: "No recent activity.",
    viewAllReports: "View all reports →",
    statsTitle: "Statistics Overview",
    totalReports: "Total reports",
    today: "Today",
    activeAlerts: "Active alerts",
    lastUpdate: "Last update",
    priorityHigh: "High",
    priorityMedium: "Medium",
    priorityLow: "Low",
    priorityUnknown: "Unknown",
    noDescription: "No description provided"
  }
};
export default en;
