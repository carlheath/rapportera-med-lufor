
import { useState } from 'react';
import { MapPin, Camera, Clock, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReportForm from '@/components/ReportForm';
import StatsOverview from '@/components/StatsOverview';

const Index = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportMode, setReportMode] = useState<'quick' | 'detailed'>('quick');

  const handleQuickReport = () => {
    setReportMode('quick');
    setShowReportForm(true);
  };

  const handleDetailedReport = () => {
    setReportMode('detailed');
    setShowReportForm(true);
  };

  if (showReportForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <ReportForm 
          mode={reportMode} 
          onBack={() => setShowReportForm(false)} 
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
            >
              <Zap className="w-5 h-5 mr-2" />
              Snabbrapport (30 sek)
            </Button>
            <Button 
              onClick={handleDetailedReport}
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 text-lg h-auto"
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
                drönare genom medborgarnas observationer, vilket bidrar till nationell säkerhet och beredskap.
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
