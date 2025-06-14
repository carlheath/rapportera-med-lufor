
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

interface ReportFormProps {
  mode: 'quick' | 'detailed';
  onBack: () => void;
}

const ReportForm = ({ mode, onBack }: ReportFormProps) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const maxSteps = mode === 'quick' ? 3 : 5;

  useEffect(() => {
    // Get battery level if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportData = {
        ...formData,
        location,
        mediaCount: mediaFiles.length,
        timestamp: new Date().toISOString(),
        batteryLevel,
        reportMode: mode,
        deviceInfo: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenResolution: `${screen.width}x${screen.height}`
        }
      };

      console.log('Report submitted:', reportData);
      toast.success('Rapport skickad framgångsrikt!', {
        description: 'Tack för ditt bidrag till nationell säkerhet.'
      });
      
      onBack();
    } catch (error) {
      toast.error('Fel vid rapportering', {
        description: 'Försök igen om ett ögonblick.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Dokumentera Flygfarkosten</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Ta foton eller video av flygfarkosten för bästa möjliga analys
              </p>
            </div>
            <CameraCapture onCapture={handleMediaCapture} />
            {mediaFiles.length > 0 && (
              <div className="text-center">
                <Badge variant="outline" className="text-green-700 border-green-300">
                  {mediaFiles.length} fil(er) tillagda
                </Badge>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Lokalisering</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Bekräfta din position för exakt rapportering
              </p>
            </div>
            <LocationCapture onLocationCapture={handleLocationCapture} />
            <WeatherWidget location={location} />
          </div>
        );

      case 3:
        if (mode === 'quick') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Snabb Beskrivning</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Beskriv kort vad du observerade
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quickDescription">Kort beskrivning</Label>
                  <Textarea
                    id="quickDescription"
                    placeholder="T.ex. 'Stor svart flygfarkost som flög i cirkulära mönster i 5 minuter'"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="urgency">Brådskande nivå</Label>
                    <Select value={formData.urgencyLevel} onValueChange={(value) => handleInputChange('urgencyLevel', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Låg</SelectItem>
                        <SelectItem value="medium">Medel</SelectItem>
                        <SelectItem value="high">Hög</SelectItem>
                        <SelectItem value="critical">Kritisk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="droneCount">Antal flygfarkoster</Label>
                    <Select value={formData.numberOfDrones} onValueChange={(value) => handleInputChange('numberOfDrones', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3-5">3-5</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Detaljerad Beskrivning</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Beskriv detaljerat vad du observerade
              </p>
            </div>
            <div>
              <Label htmlFor="detailedDescription">Detaljerad beskrivning</Label>
              <Textarea
                id="detailedDescription"
                placeholder="Beskriv så detaljerat som möjligt vad du såg..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Detaljerad Information</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Ytterligare detaljer för bättre analys
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="droneSize">Uppskattad storlek</Label>
                <Select value={formData.droneSize} onValueChange={(value) => handleInputChange('droneSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj storlek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Liten (&lt; 25cm)</SelectItem>
                    <SelectItem value="medium">Medel (25-100cm)</SelectItem>
                    <SelectItem value="large">Stor (&gt; 100cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="droneColor">Färg</Label>
                <Input
                  id="droneColor"
                  placeholder="T.ex. svart, vit, grå"
                  value={formData.droneColor}
                  onChange={(e) => handleInputChange('droneColor', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="flightPattern">Flygmönster</Label>
                <Select value={formData.flightPattern} onValueChange={(value) => handleInputChange('flightPattern', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj mönster" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hovering">Svävande</SelectItem>
                    <SelectItem value="circular">Cirkulärt</SelectItem>
                    <SelectItem value="linear">Rakt fram</SelectItem>
                    <SelectItem value="erratic">Oregelbundet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Varaktighet</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj tid" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1min">Mindre än 1 minut</SelectItem>
                    <SelectItem value="1-5min">1-5 minuter</SelectItem>
                    <SelectItem value="5-15min">5-15 minuter</SelectItem>
                    <SelectItem value="15min+">Mer än 15 minuter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Kontaktinformation (Valfritt)</h3>
              <p className="text-slate-600 dark:text-slate-300">
                För uppföljning av rapporten
              </p>
            </div>
            <div>
              <Label htmlFor="contact">E-post eller telefonnummer</Label>
              <Input
                id="contact"
                placeholder="din.email@exempel.se eller 070-123 45 67"
                value={formData.contactInfo}
                onChange={(e) => handleInputChange('contactInfo', e.target.value)}
              />
              <p className="text-sm text-slate-500 mt-1">
                Endast för uppföljning. Behandlas enligt GDPR.
              </p>
            </div>
          </div>
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

      <main className="container mx-auto px-4 py-8">
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
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
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
                    (step === 2 && !location)
                  }
                >
                  Nästa
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.description.trim()}
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportForm;
