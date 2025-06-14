import { useState } from 'react';
import { MapPin, Camera, Clock, Zap, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReportForm from '@/components/ReportForm';
import StatsOverview from '@/components/StatsOverview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define a type for the report data coming from the form
// This is an approximation; the actual ReportForm data structure might be more complex
// We'll adapt this as needed based on the actual data structure from ReportForm
interface ReportFormData {
  locationStep?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    weather?: any; // Weather data from WeatherWidget
  };
  documentStep?: {
    photo?: File | string; // Could be File object or a data URL
    video?: File | string;
    photo_url?: string; // Potentially presigned URL if handled by form
    video_url?: string; // Potentially presigned URL if handled by form
  };
  descriptionStep?: {
    description?: string;
  };
  detailsStep?: {
    // Assuming detailsStep contains various specific questions
    [key: string]: any; 
  };
  contactStep?: {
    // Assuming contactStep contains contact fields
    [key: string]: any;
  };
  // other top-level fields from the form
  [key: string]: any;
}

const Index = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportMode, setReportMode] = useState<'quick' | 'detailed'>('quick');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickReport = () => {
    setReportMode('quick');
    setShowReportForm(true);
  };

  const handleDetailedReport = () => {
    setReportMode('detailed');
    setShowReportForm(true);
  };

  const handleReportSubmit = async (formData: ReportFormData) => {
    setIsSubmitting(true);
    console.log("Form data received:", formData);

    // TODO: Implement file uploads to Supabase Storage if photo/video are File objects
    // For now, assuming photo_url/video_url might be directly provided or handled by ReportForm
    // If formData.documentStep.photo is a File, we'll need to upload it first.
    // This will be a follow-up step. For now, we pass what we have.

    const reportToInsert = {
      report_mode: reportMode,
      latitude: formData.locationStep?.latitude,
      longitude: formData.locationStep?.longitude,
      accuracy: formData.locationStep?.accuracy,
      // Assuming ReportForm provides direct URLs or we'll handle file uploads later
      photo_url: typeof formData.documentStep?.photo === 'string' ? formData.documentStep.photo : formData.documentStep?.photo_url,
      video_url: typeof formData.documentStep?.video === 'string' ? formData.documentStep.video : formData.documentStep?.video_url,
      description: formData.descriptionStep?.description,
      details: formData.detailsStep,
      contact_info: formData.contactStep,
      weather_data: formData.locationStep?.weather,
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
          mode={reportMode} 
          onBack={() => setShowReportForm(false)}
          onSubmit={handleReportSubmit}
          isSubmitting={isSubmitting} // Pass submitting state to ReportForm if it supports it
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  LUFOR
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  en app för luftrums- och flygfarkostobservation och rapportering
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-600 dark:bg-green-900/20">
              Aktiv
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Rapportera en drönare
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Hjälp till att övervaka Sveriges luftrum genom att rapportera oidentifierade drönare. 
            Din observation bidrar till nationell säkerhet och beredskap.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleQuickReport}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg h-auto"
              disabled={isSubmitting}
            >
              <Zap className="w-5 h-5 mr-2" />
              Snabbrapport (30 sek)
            </Button>
            <Button 
              onClick={handleDetailedReport}
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 text-lg h-auto"
              disabled={isSubmitting}
            >
              <Clock className="w-5 h-5 mr-2" />
              Detaljerad Rapport
            </Button>
          </div>
        </div>

        {/* About System Section */}
        <div className="mb-12">
          <Card className="border-blue-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900 dark:text-blue-300">
                <Info className="w-5 h-5 mr-2" />
                Om LUFOR-systemet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                LUFOR (Luftrums- och Flygfarkost Observationsrapportering) genomförs inom ramen för 
                initiativet <strong>Samarbete för Hybrid Innovation inom Totalförsvaret (SHIFT)</strong>. 
                Systemet utvecklas för att stärka Sveriges förmåga att upptäcka och rapportera oidentifierade 
                drönare genom medborgarnas observationer, vilket bidrar till nationell säkerhet och beredskap. Nu med datalagring i Supabase!
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-blue-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900 dark:text-blue-300">
                <Camera className="w-5 h-5 mr-2" />
                Dokumentera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Ta foton och videor av drönaren. Systemet samlar automatiskt in GPS-position och tidsstämplar.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900 dark:text-blue-300">
                <MapPin className="w-5 h-5 mr-2" />
                Lokalisera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Exakt GPS-koordinater och väderdata samlas in automatiskt för precis positionering.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900 dark:text-blue-300">
                <Zap className="w-5 h-5 mr-2" />
                Analysera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                AI-driven analys klassificerar drönaren och korrelerar med andra rapporter för hotbedömning.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
            Viktigt att veta
          </h3>
          <ul className="text-amber-800 dark:text-amber-200 space-y-1 text-sm">
            <li>• Rapportera endast oidentifierade eller misstänkta drönare</li>
            <li>• All data behandlas enligt GDPR och svenska integritetslagar</li>
            <li>• Vid akut hot, kontakta omedelbart 112</li>
            <li>• Dina rapporter bidrar till nationell säkerhetsanalys</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Index;
