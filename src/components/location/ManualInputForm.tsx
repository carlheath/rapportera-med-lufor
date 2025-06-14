
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  manualLat: string;
  manualLng: string;
  onLatChange: (val: string) => void;
  onLngChange: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  disableSubmit?: boolean;
}

const ManualInputForm = ({
  manualLat,
  manualLng,
  onLatChange,
  onLngChange,
  onSubmit,
  onBack,
  disableSubmit
}: Props) => (
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
          onChange={(e) => onLatChange(e.target.value)}
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
          onChange={(e) => onLngChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={onSubmit}
          disabled={disableSubmit}
          className="flex-1"
        >
          Spara Position
        </Button>
        <Button 
          onClick={onBack} 
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
);

export default ManualInputForm;
