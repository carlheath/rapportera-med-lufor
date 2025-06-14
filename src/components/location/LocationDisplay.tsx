
import { CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocationStatus from './LocationStatus';

interface Props {
  hasValidLocation: boolean;
  onUpdateGPS: () => void;
  onChangeManual: () => void;
  isLoading: boolean;
  location: GeolocationPosition | null;
  manualLocation: { lat: number; lng: number } | null;
}

const LocationDisplay = ({
  hasValidLocation,
  onUpdateGPS,
  onChangeManual,
  isLoading,
  location,
  manualLocation,
}: Props) => (
  <>
    <div className="flex justify-center">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
        {hasValidLocation ? (
          <CheckCircle className="w-8 h-8 text-green-600" />
        ) : (
          <MapPin className="w-8 h-8 text-blue-600" />
        )}
      </div>
    </div>
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
        Position Bekräftad
      </h3>
      <LocationStatus
        accuracy={location?.coords.accuracy || 1000}
        location={location
          ? { lat: location.coords.latitude, lng: location.coords.longitude }
          : manualLocation}
      />
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onUpdateGPS}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          Uppdatera GPS
        </Button>
        <Button
          onClick={onChangeManual}
          variant="outline"
          size="sm"
        >
          Ändra Manuellt
        </Button>
      </div>
    </div>
  </>
);

export default LocationDisplay;
