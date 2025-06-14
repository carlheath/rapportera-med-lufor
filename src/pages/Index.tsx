import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Menu, Bug, LogIn, Languages, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportForm from '@/components/ReportForm';
import StatsOverview from '@/components/StatsOverview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Session } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';

// Define a type for the report data coming from the form
interface ReportFormData {
  location: { lat: number, lng: number, accuracy: number } | null;
  mediaFiles: File[];
  description: string;
  droneSize: string;
  droneColor: string;
  flightPattern: string;
  duration: string;
  numberOfDrones: string;
  contactInfo: string;
  urgencyLevel: string;
  batteryLevel: number | null;
  reportMode: 'quick' | 'detailed';
  deviceInfo: any;
  [key: string]: any;
}

const Index = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success(t('toasts.loggedOut'));
  };

  const handleReport = () => {
    setShowReportForm(true);
  };

  const handleReportSubmit = async (formData: ReportFormData) => {
    setIsSubmitting(true);
    console.log("Form data received:", formData);

    // TODO: Implement file uploads to Supabase Storage if photo/video are File objects
    // For now, assuming photo_url/video_url might be directly provided or handled by ReportForm
    // If formData.documentStep.photo is a File, we'll need to upload it first.
    // This will be a follow-up step. For now, we pass what we have.

    const details = {
      droneSize: formData.droneSize,
      droneColor: formData.droneColor,
      flightPattern: formData.flightPattern,
      duration: formData.duration,
      numberOfDrones: formData.numberOfDrones,
      urgencyLevel: formData.urgencyLevel,
    };

    const reportToInsert = {
      report_mode: formData.reportMode,
      latitude: formData.location?.lat,
      longitude: formData.location?.lng,
      accuracy: formData.location?.accuracy,
      // Assuming ReportForm provides direct URLs or we'll handle file uploads later
      photo_url: null,
      video_url: null,
      description: formData.description,
      details: details,
      contact_info: { contact: formData.contactInfo },
      weather_data: null, // Placeholder for now
      raw_form_data: formData, // Store the entire form data for auditing
      // status will default to 'new' in the database
    };

    console.log("Data to insert into Supabase:", reportToInsert);

    // Validate required fields
    if (!reportToInsert.latitude || !reportToInsert.longitude) {
      toast.error(t('toasts.reportError'), {
        description: t('toasts.reportErrorLocationMissing'),
        icon: <AlertTriangle className="w-4 h-4" />,
      });
      setIsSubmitting(false);
      return;
    }
    
    const { error } = await supabase.from('reports').insert([reportToInsert]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error inserting report:", error);
      toast.error(t('toasts.reportError'), {
        description: t('toasts.genericError', { message: error.message }),
        icon: <AlertTriangle className="w-4 h-4" />,
      });
    } else {
      toast.success(t('toasts.reportSuccess'), {
        description: t('toasts.reportSuccessDescription'),
      });
      setShowReportForm(false); // Close the form on successful submission
    }
  };

  if (showReportForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <ReportForm 
          mode="detailed"
          onBack={() => setShowReportForm(false)}
          onSubmit={handleReportSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Öppna meny">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/about">{t('header.about')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => i18n.changeLanguage(i18n.language === 'sv' ? 'en' : 'sv')}>
              <Languages className="mr-2 h-4 w-4" />
              <span>{t('header.switchLanguage')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="mailto:bugg@lufor.se?subject=Buggrapport LUFOR" className="w-full flex items-center">
                <Bug className="mr-2 h-4 w-4" />
                <span>{t('header.reportBug')}</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {session ? (
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('header.logout')}</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>{t('header.login')}</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </Header>

      <main className="container mx-auto px-4 py-8 pb-32 sm:pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('indexPage.heroTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('indexPage.heroSubtitle')}
          </p>
        </div>
        
        {/* Static Report Button on Desktop */}
        <div className="hidden sm:flex justify-center my-8">
           <Button 
              onClick={handleReport}
              variant="destructive"
              size="lg"
              className="font-bold px-12 py-6 text-xl h-auto shadow-lg"
              disabled={isSubmitting}
              aria-label="Rapportera drönare"
            >
              <Zap className="w-6 h-6 mr-3" />
              {t('indexPage.reportButton')}
            </Button>
        </div>
        
        {/* Stats and Activity Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <StatsOverview />
        </div>
        
      </main>

      {/* Sticky Report Button on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-t border-border sm:hidden">
        <Button 
          onClick={handleReport}
          variant="destructive"
          size="lg"
          className="w-full font-bold py-5 text-lg h-auto shadow-lg"
          disabled={isSubmitting}
          aria-label="Rapportera drönare"
        >
          <Zap className="w-6 h-6 mr-3" />
          {t('indexPage.reportButton')}
        </Button>
      </div>

    </div>
  );
};

export default Index;
