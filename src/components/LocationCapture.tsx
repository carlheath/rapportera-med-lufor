import { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ManualInputForm from './location/ManualInputForm';
import LocationDisplay from './location/LocationDisplay';
import LocationErrorDisplay from './location/LocationErrorDisplay';

interface LocationCaptureProps {
  onLocationCapture: (coords: { lat: number; lng: number; accuracy: number }) => void;
}

const LocationCapture = ({ onLocationCapture }: LocationCaptureProps) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [manualLocation, setManualLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useManualInput, setUseManualInput] = useState(false);
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolokalisering stöds inte av din webbläsare');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setManualLocation(null);
        setUseManualInput(false);
        setIsLoading(false);
        onLocationCapture({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        toast.success('Position hittad!');
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Åtkomst till position nekad. Aktivera platsdelning i webbläsaren.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Positionsinformation är inte tillgänglig.');
            break;
          case error.TIMEOUT:
            setError('Begäran om position tog för lång tid.');
            break;
          default:
            setError('Ett okänt fel uppstod vid hämtning av position.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleManualLocationSubmit = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (isNaN(lat) || isNaN(lng)) {
      toast.error('Ange giltiga koordinater');
      return;
    }

    if (lat < -90 || lat > 90) {
      toast.error('Latitud måste vara mellan -90 och 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      toast.error('Longitud måste vara mellan -180 och 180');
      return;
    }

    setManualLocation({ lat, lng });
    setLocation(null);
    setError(null);
    onLocationCapture({
      lat,
      lng,
      accuracy: 1000 // Set a default accuracy for manual input
    });
    toast.success('Manuell position sparad!');
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`;
  };

  const getAccuracyText = (accuracy: number) => {
    if (accuracy >= 1000) return 'Manuell inmatning';
    if (accuracy < 10) return 'Mycket hög noggrannhet';
    if (accuracy < 50) return 'Hög noggrannhet';
    if (accuracy < 100) return 'Medel noggrannhet';
    return 'Låg noggrannhet';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 1000) return 'text-blue-700 border-blue-300 bg-blue-50';
    if (accuracy < 10) return 'text-green-700 border-green-300 bg-green-50';
    if (accuracy < 50) return 'text-blue-700 border-blue-300 bg-blue-50';
    if (accuracy < 100) return 'text-yellow-700 border-yellow-300 bg-yellow-50';
    return 'text-red-700 border-red-300 bg-red-50';
  };

  useEffect(() => {
    // Try to get location automatically when component mounts
    getCurrentLocation();
  }, []);

  const hasValidLocation = location || manualLocation;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {hasValidLocation ? (
            <LocationDisplay
              hasValidLocation={!!hasValidLocation}
              onUpdateGPS={getCurrentLocation}
              onChangeManual={() => setUseManualInput(true)}
              isLoading={isLoading}
              location={location}
              manualLocation={manualLocation}
            />
          ) : useManualInput ? (
            <ManualInputForm
              manualLat={manualLat}
              manualLng={manualLng}
              onLatChange={setManualLat}
              onLngChange={setManualLng}
              onSubmit={handleManualLocationSubmit}
              onBack={() => { setUseManualInput(false); setError(null); }}
              disableSubmit={!manualLat || !manualLng}
            />
          ) : error ? (
            <LocationErrorDisplay
              error={error}
              isLoading={isLoading}
              onRetry={getCurrentLocation}
              onManual={() => setUseManualInput(true)}
            />
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {isLoading ? 'Hämtar Position...' : 'Hämta Din Position'}
              </h3>
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Vi behöver din position för att kunna lokalisera drönaren exakt.
                </p>
                {!isLoading && (
                  <div className="flex gap-2 justify-center">
                    <Button onClick={getCurrentLocation}>
                      Hämta Position
                    </Button>
                    <Button
                      onClick={() => setUseManualInput(true)}
                      variant="outline"
                    >
                      Ange Manuellt
                    </Button>
                  </div>
                )}
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-slate-500 dark:text-slate-400 border-t pt-3">
            <p>Din position används endast för denna rapport och lagras säkert enligt GDPR.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCapture;
