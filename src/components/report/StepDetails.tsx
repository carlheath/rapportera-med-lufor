
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

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

const StepDetails = ({ formData, onChange, validationErrors }: StepDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{t('reportForm.detailsTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-300">
          {t('reportForm.detailsSubtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="droneSize">{t('reportForm.sizeLabel')}</Label>
          <Select value={formData.droneSize} onValueChange={(value) => onChange('droneSize', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('reportForm.sizePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{t('reportForm.sizeSmall')}</SelectItem>
              <SelectItem value="medium">{t('reportForm.sizeMedium')}</SelectItem>
              <SelectItem value="large">{t('reportForm.sizeLarge')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="droneColor">{t('reportForm.colorLabel')}</Label>
          <Input
            id="droneColor"
            placeholder={t('reportForm.colorPlaceholder')}
            value={formData.droneColor}
            onChange={(e) => onChange('droneColor', e.target.value)}
          />
          {validationErrors.droneColor && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.droneColor}</p>
          )}
        </div>
        <div>
          <Label htmlFor="flightPattern">{t('reportForm.flightPatternLabel')}</Label>
          <Select value={formData.flightPattern} onValueChange={(value) => onChange('flightPattern', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('reportForm.flightPatternPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hovering">{t('reportForm.patternHovering')}</SelectItem>
              <SelectItem value="circular">{t('reportForm.patternCircular')}</SelectItem>
              <SelectItem value="linear">{t('reportForm.patternLinear')}</SelectItem>
              <SelectItem value="erratic">{t('reportForm.patternErratic')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="duration">{t('reportForm.durationLabel')}</Label>
          <Select value={formData.duration} onValueChange={(value) => onChange('duration', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('reportForm.durationPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<1min">{t('reportForm.durationLt1m')}</SelectItem>
              <SelectItem value="1-5min">{t('reportForm.duration1to5m')}</SelectItem>
              <SelectItem value="5-15min">{t('reportForm.duration5to15m')}</SelectItem>
              <SelectItem value="15min+">{t('reportForm.durationGt15m')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StepDetails;
