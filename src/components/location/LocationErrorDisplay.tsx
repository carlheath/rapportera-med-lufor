
import { Button } from '@/components/ui/button';

interface Props {
  error: string;
  isLoading: boolean;
  onRetry: () => void;
  onManual: () => void;
}

const LocationErrorDisplay = ({ error, isLoading, onRetry, onManual }: Props) => (
  <div className="space-y-3">
    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
    <div className="flex gap-2 justify-center">
      <Button onClick={onRetry} disabled={isLoading}>
        Försök Igen
      </Button>
      <Button onClick={onManual} variant="outline">
        Ange Manuellt
      </Button>
    </div>
  </div>
);

export default LocationErrorDisplay;
