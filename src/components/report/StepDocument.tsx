
import { Badge } from '@/components/ui/badge';
import CameraCapture from '../CameraCapture';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Youtube } from 'lucide-react';

interface StepDocumentProps {
  mediaFiles: File[];
  onCapture: (files: File[]) => void;
  externalLink: string;
  onLinkChange: (value: string) => void;
  validationError?: string;
}

const StepDocument = ({ mediaFiles, onCapture, externalLink, onLinkChange, validationError }: StepDocumentProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{t('reportForm.documentTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-300">
          {t('reportForm.documentSubtitle')}
        </p>
      </div>
      <CameraCapture onCapture={onCapture} />
      {mediaFiles.length > 0 && (
        <div className="text-center">
          <Badge variant="outline" className="text-green-700 border-green-300">
            {t('reportForm.filesAdded', { count: mediaFiles.length })}
          </Badge>
        </div>
      )}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white/50 dark:bg-slate-900/50 px-2 text-muted-foreground">{t('common.or')}</span>
        </div>
      </div>
      <div>
        <Label htmlFor="external-link">{t('reportForm.externalLink')}</Label>
        <div className="relative mt-1">
          <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="external-link"
            placeholder="https://youtube.com/watch?v=..."
            value={externalLink}
            onChange={(e) => onLinkChange(e.target.value)}
            className="pl-10"
          />
        </div>
        {validationError && (
          <p className="text-red-600 text-sm mt-1">{validationError}</p>
        )}
         <p className="text-sm text-muted-foreground mt-2">{t('reportForm.externalLinkDescription')}</p>
      </div>
    </div>
  );
};

export default StepDocument;
