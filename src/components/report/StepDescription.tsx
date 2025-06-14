
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StepDescriptionProps {
  description: string;
  onChange: (desc: string) => void;
  validationError?: string;
  quickMode?: boolean;
}

const StepDescription = ({
  description,
  onChange,
  validationError,
  quickMode = false
}: StepDescriptionProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">
        {quickMode ? 'Snabb Beskrivning' : 'Detaljerad Beskrivning'}
      </h3>
      <p className="text-slate-600 dark:text-slate-300">
        {quickMode ? 'Beskriv kort vad du observerade' : 'Beskriv detaljerat vad du observerade'}
      </p>
    </div>
    <div>
      <Label htmlFor="desc">
        {quickMode ? 'Kort beskrivning' : 'Detaljerad beskrivning'}
      </Label>
      <Textarea
        id="desc"
        placeholder={quickMode
          ? "T.ex. 'Stor svart drönare som flög i cirkulära mönster i 5 minuter'"
          : "Beskriv så detaljerat som möjligt vad du såg..."}
        value={description}
        onChange={(e) => onChange(e.target.value)}
        className={quickMode ? "min-h-[100px]" : "min-h-[120px]"}
      />
      {validationError && (
        <p className="text-red-600 text-sm mt-1">{validationError}</p>
      )}
    </div>
  </div>
);

export default StepDescription;
