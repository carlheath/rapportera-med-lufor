
import { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              {hasValidLocation ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <MapPin className="w-8 h-8 text-blue-600" />
              )}
            </div>
          </div>

          {hasValidLocation ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                Position Bekräftad
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>Koordinater:</strong><br />
                  {location ? 
                    formatCoordinates(location.coords.latitude, location.coords.longitude) :
                    formatCoordinates(manualLocation!.lat, manualLocation!.lng)
                  }
                </p>
                <Badge 
                  variant="outline" 
                  className={getAccuracyColor(location?.coords.accuracy || 1000)}
                >
                  {getAccuracyText(location?.coords.accuracy || 1000)}
                  {location && ` (±${Math.round(location.coords.accuracy)}m)`}
                </Badge>
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={getCurrentLocation} 
                  variant="outline" 
                  size="sm"
                  disabled={isLoading}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Uppdatera GPS
                </Button>
                <Button 
                  onClick={() => setUseManualInput(true)} 
                  variant="outline" 
                  size="sm"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Ändra Manuellt
                </Button>
              </div>
            </div>
          ) : useManualInput ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Ange Position Manuellt
              </h3>
              <div className="space-y-3 text-left">
                <div>
                  <Label htmlFor="manual-lat">Latitud (t.ex. 59.3293)</Label>
                  <Input
                    id="manual-lat"
                    type="number"
                    step="any"
                    placeholder="59.3293"
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="manual-lng">Longitud (t.ex. 18.0686)</Label>
                  <Input
                    id="manual-lng"
                    type="number"
                    step="any"
                    placeholder="18.0686"
                    value={manualLng}
                    onChange={(e) => setManualLng(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleManualLocationSubmit}
                    disabled={!manualLat || !manualLng}
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Spara Position
                  </Button>
                  <Button 
                    onClick={() => {setUseManualInput(false); setError(null);}} 
                    variant="outline"
                    className="flex-1"
                  >
                    Tillbaka till GPS
                  </Button>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ange koordinater i decimalformat (WGS84)
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {isLoading ? 'Hämtar Position...' : 'Hämta Din Position'}
              </h3>
              
              {error ? (
                <div className="space-y-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={getCurrentLocation} disabled={isLoading}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Försök Igen
                    </Button>
                    <Button 
                      onClick={() => setUseManualInput(true)} 
                      variant="outline"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Ange Manuellt
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Vi behöver din position för att kunna lokalisera drönaren exakt.
                  </p>
                  {!isLoading && (
                    <div className="flex gap-2 justify-center">
                      <Button onClick={getCurrentLocation}>
                        <MapPin className="w-4 h-4 mr-2" />
                        Hämta Position
                      </Button>
                      <Button 
                        onClick={() => setUseManualInput(true)} 
                        variant="outline"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
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
