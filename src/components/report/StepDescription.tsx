
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';

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
}: StepDescriptionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          {quickMode ? t('reportForm.quickDescriptionTitle') : t('reportForm.detailedDescriptionTitle')}
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          {quickMode ? t('reportForm.quickDescriptionSubtitle') : t('reportForm.detailedDescriptionSubtitle')}
        </p>
      </div>
      <div>
        <Label htmlFor="desc">
          {quickMode ? t('reportForm.quickDescriptionLabel') : t('reportForm.detailedDescriptionLabel')}
        </Label>
        <Textarea
          id="desc"
          placeholder={quickMode
            ? t('reportForm.quickDescriptionPlaceholder')
            : t('reportForm.detailedDescriptionPlaceholder')}
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
};

export default StepDescription;
