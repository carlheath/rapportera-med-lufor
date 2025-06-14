
import { Badge } from '@/components/ui/badge';

interface LocationStatusProps {
  accuracy: number;
  location: { lat: number; lng: number } | null;
}

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
const formatCoordinates = (lat: number, lng: number) =>
  `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`;

const LocationStatus = ({
  accuracy,
  location,
}: LocationStatusProps) => (
  <div className="space-y-2">
    {location && (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        <strong>Koordinater:</strong><br />
        {formatCoordinates(location.lat, location.lng)}
      </p>
    )}
    <Badge 
      variant="outline" 
      className={getAccuracyColor(accuracy)}
    >
      {getAccuracyText(accuracy)}
      {accuracy < 1000 && ` (±${Math.round(accuracy)}m)`}
    </Badge>
  </div>
);

export default LocationStatus;
