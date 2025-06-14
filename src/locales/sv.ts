const sv = {
  header: {
    about: "Om LUFOR",
    switchLanguage: "Byt till Engelska",
    reportBug: "Rapportera en bugg",
    logout: "Logga ut",
    login: "Logga in",
    logoAlt: "LUFOR-logotyp",
    menuAriaLabel: "Öppna meny"
  },
  indexPage: {
    heroTitle: "Observerat en drönare?",
    heroSubtitle: "Din rapport hjälper till att trygga Sveriges luftrum. Tillsammans skapar vi en säkrare nationell beredskap.",
    reportButton: "Rapportera drönare"
  },
  toasts: {
    loggedOut: "Du har loggats ut.",
    reportError: "Fel vid rapportering",
    reportErrorLocationMissing: "Platsinformation (latitud och longitud) är obligatorisk.",
    reportSuccess: "Rapport skickad!",
    reportSuccessDescription: "Tack för din observation. Din rapport har tagits emot.",
    genericError: "Ett fel uppstod: {{message}}. Försök igen."
  },
  loginPage: {
    title: "Logga in",
    description: "Endast för behörig personal.",
    emailLabel: "E-post",
    emailPlaceholder: "namn@exempel.com",
    passwordLabel: "Lösenord",
    submitButton: "Logga in",
    submitButtonLoading: "Loggar in...",
    noAccount: "Har du inget konto?",
    signUpLink: "Skapa ett konto",
    loginFailed: "Inloggning misslyckades",
    loginSuccess: "Inloggning lyckades!"
  },
  signUpPage: {
    title: "Skapa konto",
    description: "Fyll i dina uppgifter för att registrera dig.",
    emailLabel: "E-post",
    emailPlaceholder: "namn@exempel.com",
    passwordLabel: "Lösenord",
    submitButton: "Skapa konto",
    submitButtonLoading: "Registrerar...",
    hasAccount: "Har du redan ett konto?",
    loginLink: "Logga in",
    signUpError: "Fel vid registrering",
    signUpSuccess: "Registrering lyckades!",
    signUpSuccessDescription: "Vänligen kolla din e-post för att bekräfta ditt konto."
  },
  aboutPage: {
    title: "Om LUFOR",
    subtitle: "LUFOR är en plattform för att samla in, analysera och visualisera observationer av obemannade luftfarkoster (drönare) från allmänheten. Syftet är att stärka Sveriges nationella beredskap och situational awareness i luftrummet.",
    p1: "Genom att rapportera dina observationer bidrar du direkt till en tryggare och säkrare miljö. Varje rapport är en viktig pusselbit som hjälper myndigheter och andra aktörer att få en bättre bild av aktiviteten i luftrummet.",
    p2: "Denna applikation är utvecklad inom forskningsprogrammet SHIFT och drivs av RISE - Research Institutes of Sweden, med fokus på användarvänlighet och säkerhet. Din data hanteras med största sekretess och används endast i syfte att stärka den nationella säkerheten.",
    p3: "Tack för ditt engagemang!"
  },
  common: {
    back: "Tillbaka"
  },
  reportForm: {
    quickReport: 'Snabbrapport',
    detailedReport: 'Detaljerad rapport',
    step: 'Steg {{step}} av {{maxSteps}}',
    progress: '{{progress}}% klart',
    previous: 'Föregående',
    next: 'Nästa',
    submit: 'Skicka Rapport',
    submitting: 'Skickar...',
    rateLimitErrorTitle: 'För många rapporter',
    rateLimitErrorDescription: 'Vänta 5 minuter innan du skickar en ny rapport.',
    validationErrorTitle: 'Kontrollera formuläret',
    validationErrorDescription: 'Det finns fel i formuläret som måste åtgärdas.',
    invalidValue: 'Ogiltigt värde',
    
    documentTitle: 'Dokumentera Drönaren',
    documentSubtitle: 'Ta foton eller video av drönaren för bästa möjliga analys',
    filesAdded: '{{count}} fil(er) tillagda',
    
    locationTitle: 'Lokalisering',
    locationSubtitle: 'Bekräfta din position för exakt rapportering',
    
    quickDescriptionTitle: 'Snabb Beskrivning',
    detailedDescriptionTitle: 'Detaljerad Beskrivning',
    quickDescriptionSubtitle: 'Beskriv kort vad du observerade',
    detailedDescriptionSubtitle: 'Beskriv detaljerat vad du observerade',
    quickDescriptionLabel: 'Kort beskrivning',
    detailedDescriptionLabel: 'Detaljerad beskrivning',
    quickDescriptionPlaceholder: "T.ex. 'Stor svart drönare som flög i cirkulära mönster i 5 minuter'",
    detailedDescriptionPlaceholder: "Beskriv så detaljerat som möjligt vad du såg...",
    
    detailsTitle: 'Detaljerad Information',
    detailsSubtitle: 'Ytterligare detaljer för bättre analys',
    sizeLabel: 'Uppskattad storlek',
    sizePlaceholder: 'Välj storlek',
    sizeSmall: 'Liten (< 25cm)',
    sizeMedium: 'Medel (25-100cm)',
    sizeLarge: 'Stor (> 100cm)',
    colorLabel: 'Färg',
    colorPlaceholder: 'T.ex. svart, vit, grå',
    flightPatternLabel: 'Flygmönster',
    flightPatternPlaceholder: 'Välj mönster',
    patternHovering: 'Svävande',
    patternCircular: 'Cirkulärt',
    patternLinear: 'Rakt fram',
    patternErratic: 'Oregelbundet',
    durationLabel: 'Varaktighet',
    durationPlaceholder: 'Välj tid',
    durationLt1m: 'Mindre än 1 minut',
    duration1to5m: '1-5 minuter',
    duration5to15m: '5-15 minuter',
    durationGt15m: 'Mer än 15 minuter',
    
    contactTitle: 'Kontaktinformation (Valfritt)',
    contactSubtitle: 'För uppföljning av rapporten',
    contactLabel: 'E-post eller telefonnummer',
    contactPlaceholder: 'din.email@exempel.se eller 070-123 45 67',
    contactGdpr: 'Endast för uppföljning. Behandlas enligt GDPR.',
    fileErrors: {
      fileTooLarge: 'Filen får inte vara större än 10MB',
      invalidFileType: 'Endast bilder (JPEG, PNG, WebP) och videor (MP4, WebM) är tillåtna',
      invalidFileName: 'Filnamnet innehåller ogiltiga tecken'
    }
  },
  statsOverview: {
    errorTitle: "Fel vid hämtning av data",
    errorDescription: "Kunde inte ladda statistik. Försök att ladda om sidan.",
    recentActivityTitle: "Senaste Aktivitet",
    recentActivityDescription: "En översikt av de senast inkomna observationerna.",
    noRecentActivity: "Ingen nylig aktivitet.",
    viewAllReports: "Visa alla rapporter →",
    statsTitle: "Statistiköversikt",
    totalReports: "Totala rapporter",
    today: "Idag",
    activeAlerts: "Aktiva varningar",
    lastUpdate: "Senaste uppdatering",
    priorityHigh: "Hög",
    priorityMedium: "Medel",
    priorityLow: "Låg",
    priorityUnknown: "Okänd",
    noDescription: "Ingen beskrivning angiven"
  }
};

export default sv;
