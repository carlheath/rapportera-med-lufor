
import { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface LocationCaptureProps {
  onLocationCapture: (coords: { lat: number; lng: number; accuracy: number }) => void;
}

const LocationCapture = ({ onLocationCapture }: LocationCaptureProps) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`;
  };

  const getAccuracyText = (accuracy: number) => {
    if (accuracy < 10) return 'Mycket hög noggrannhet';
    if (accuracy < 50) return 'Hög noggrannhet';
    if (accuracy < 100) return 'Medel noggrannhet';
    return 'Låg noggrannhet';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy < 10) return 'text-green-700 border-green-300 bg-green-50';
    if (accuracy < 50) return 'text-blue-700 border-blue-300 bg-blue-50';
    if (accuracy < 100) return 'text-yellow-700 border-yellow-300 bg-yellow-50';
    return 'text-red-700 border-red-300 bg-red-50';
  };

  useEffect(() => {
    // Try to get location automatically when component mounts
    getCurrentLocation();
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              {location ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <MapPin className="w-8 h-8 text-blue-600" />
              )}
            </div>
          </div>

          {location ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                Position Bekräftad
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>Koordinater:</strong><br />
                  {formatCoordinates(location.coords.latitude, location.coords.longitude)}
                </p>
                <Badge 
                  variant="outline" 
                  className={getAccuracyColor(location.coords.accuracy)}
                >
                  {getAccuracyText(location.coords.accuracy)} (±{Math.round(location.coords.accuracy)}m)
                </Badge>
              </div>
              <Button 
                onClick={getCurrentLocation} 
                variant="outline" 
                size="sm"
                disabled={isLoading}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Uppdatera Position
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {isLoading ? 'Hämtar Position...' : 'Hämta Din Position'}
              </h3>
              
              {error ? (
                <div className="space-y-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  <Button onClick={getCurrentLocation} disabled={isLoading}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Försök Igen
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Vi behöver din position för att kunna lokalisera drönaren exakt.
                  </p>
                  {!isLoading && (
                    <Button onClick={getCurrentLocation}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Hämta Position
                    </Button>
                  )}
                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                    </div>
                  )}
                </div>
              )}
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
