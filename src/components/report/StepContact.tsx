
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface StepContactProps {
  contactInfo: string;
  onChange: (value: string) => void;
  validationError?: string;
}

const StepContact = ({ contactInfo, onChange, validationError }: StepContactProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{t('reportForm.contactTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-300">
          {t('reportForm.contactSubtitle')}
        </p>
      </div>
      <div>
        <Label htmlFor="contact">{t('reportForm.contactLabel')}</Label>
        <Input
          id="contact"
          placeholder={t('reportForm.contactPlaceholder')}
          value={contactInfo}
          onChange={(e) => onChange(e.target.value)}
        />
        {validationError && (
          <p className="text-red-600 text-sm mt-1">{validationError}</p>
        )}
        <p className="text-sm text-slate-500 mt-1">
          {t('reportForm.contactGdpr')}
        </p>
      </div>
    </div>
  );
};

export default StepContact;
