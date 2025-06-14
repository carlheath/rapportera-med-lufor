
import LocationCapture from '../LocationCapture';
import WeatherWidget from '../WeatherWidget';
import { useTranslation } from 'react-i18next';

interface StepLocationProps {
  location: { lat: number; lng: number; accuracy: number } | null;
  onLocationCapture: (coords: { lat: number; lng: number; accuracy: number }) => void;
}

const StepLocation = ({ location, onLocationCapture }: StepLocationProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{t('reportForm.locationTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-300">
          {t('reportForm.locationSubtitle')}
        </p>
      </div>
      <LocationCapture onLocationCapture={onLocationCapture} />
      <WeatherWidget location={location} />
    </div>
  );
};

export default StepLocation;
