
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface StepContactProps {
  contactInfo: string;
  onChange: (value: string) => void;
  validationError?: string;
}

const StepContact = ({ contactInfo, onChange, validationError }: StepContactProps) => (
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
        value={contactInfo}
        onChange={(e) => onChange(e.target.value)}
      />
      {validationError && (
        <p className="text-red-600 text-sm mt-1">{validationError}</p>
      )}
      <p className="text-sm text-slate-500 mt-1">
        Endast för uppföljning. Behandlas enligt GDPR.
      </p>
    </div>
  </div>
);

export default StepContact;
