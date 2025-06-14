
import LocationCapture from '../LocationCapture';
import WeatherWidget from '../WeatherWidget';

interface StepLocationProps {
  location: { lat: number; lng: number; accuracy: number } | null;
  onLocationCapture: (coords: { lat: number; lng: number; accuracy: number }) => void;
}

const StepLocation = ({ location, onLocationCapture }: StepLocationProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Lokalisering</h3>
      <p className="text-slate-600 dark:text-slate-300">
        Bekräfta din position för exakt rapportering
      </p>
    </div>
    <LocationCapture onLocationCapture={onLocationCapture} />
    <WeatherWidget location={location} />
  </div>
);

export default StepLocation;
