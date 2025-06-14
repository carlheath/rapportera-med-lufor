import { useState } from 'react';
import { Camera, Zap, AlertTriangle, Menu, Bug, LogIn, Language } from 'lucide-react';
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
      toast.error("Fel vid rapportering", {
        description: "Platsinformation (latitud och longitud) är obligatorisk.",
        icon: <AlertTriangle className="w-4 h-4" />,
      });
      setIsSubmitting(false);
      return;
    }
    
    const { error } = await supabase.from('reports').insert([reportToInsert]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error inserting report:", error);
      toast.error("Fel vid rapportering", {
        description: `Ett fel uppstod: ${error.message}. Försök igen.`,
        icon: <AlertTriangle className="w-4 h-4" />,
      });
    } else {
      toast.success("Rapport skickad!", {
        description: "Tack för din observation. Din rapport har tagits emot.",
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
      {/* Header */}
      <header className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  LUFOR
                </h1>
                <p className="text-sm text-muted-foreground">
                  Observation och rapportering av luftfarkoster
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Öppna meny">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/about">Om LUFOR</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info('Funktion för språkbyte kommer snart.')}>
                  <Language className="mr-2 h-4 w-4" />
                  <span>Byt språk (Engelska)</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="mailto:bugg@lufor.se?subject=Buggrapport LUFOR" className="w-full flex items-center">
                    <Bug className="mr-2 h-4 w-4" />
                    <span>Rapportera en bugg</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Logga in</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-32 sm:pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Observerat en drönare?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Din rapport hjälper till att trygga Sveriges luftrum. Tillsammans skapar vi en säkrare nationell beredskap.
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
              Rapportera drönare
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
          Rapportera drönare
        </Button>
      </div>

    </div>
  );
};

export default Index;
