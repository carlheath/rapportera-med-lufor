
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepDetailsProps {
  formData: {
    droneSize: string;
    droneColor: string;
    flightPattern: string;
    duration: string;
  };
  onChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

const StepDetails = ({ formData, onChange, validationErrors }: StepDetailsProps) => (
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
        <Select value={formData.droneSize} onValueChange={(value) => onChange('droneSize', value)}>
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
          onChange={(e) => onChange('droneColor', e.target.value)}
        />
        {validationErrors.droneColor && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.droneColor}</p>
        )}
      </div>
      <div>
        <Label htmlFor="flightPattern">Flygmönster</Label>
        <Select value={formData.flightPattern} onValueChange={(value) => onChange('flightPattern', value)}>
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
        <Select value={formData.duration} onValueChange={(value) => onChange('duration', value)}>
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

export default StepDetails;
