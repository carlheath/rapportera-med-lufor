
import { Badge } from '@/components/ui/badge';
import CameraCapture from '../CameraCapture';
import { useTranslation } from 'react-i18next';

interface StepDocumentProps {
  mediaFiles: File[];
  onCapture: (files: File[]) => void;
}

const StepDocument = ({ mediaFiles, onCapture }: StepDocumentProps) => {
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
    </div>
  );
};

export default StepDocument;
