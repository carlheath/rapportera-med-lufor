
import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface WeatherWidgetProps {
  location: { lat: number; lng: number; accuracy: number } | null;
}

interface WeatherData {
  temperature: number;
  description: string;
  windSpeed: number;
  humidity: number;
  visibility: number;
  icon: string;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    if (!location) return;
    
    setIsLoading(true);
    setError(null);
    setWeather(null);
    try {
       const { data, error: functionError } = await supabase.functions.invoke('get-weather', {
        body: { lat: location.lat, lng: location.lng },
      });

      if (functionError) {
        throw new Error(functionError.message);
      }
      
      const transformedData: WeatherData = {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        windSpeed: Math.round(data.wind.speed),
        humidity: data.main.humidity,
        visibility: data.visibility / 1000,
        icon: data.weather[0].icon,
      };
      
      setWeather(transformedData);
    } catch (err: any) {
      console.error('Weather fetch error:', err);
      setError('Kunde inte hämta väderdata.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const mainIcon = iconCode.substring(0, 2);
    switch (mainIcon) {
      case '01': return <Sun className="w-5 h-5 text-yellow-500" />;
      case '02':
      case '03':
      case '04': return <Cloud className="w-5 h-5 text-slate-500" />;
      case '09':
      case '10': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case '11': return <CloudRain className="w-5 h-5 text-yellow-600" />;
      case '13': return <Cloud className="w-5 h-5 text-white" />;
      case '50': return <Wind className="w-5 h-5 text-slate-400" />;
      default: return <Cloud className="w-5 h-5 text-slate-500" />;
    }
  };

  if (!location) {
    return null;
  }

  return (
    <Card className="border-blue-200 dark:border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-900 dark:text-white">
            Väderförhållanden
          </h4>
          <Badge variant="outline" className="text-xs">
            Nu
          </Badge>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : weather ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getWeatherIcon(weather.icon)}
                <span className="text-sm font-medium capitalize">{weather.description}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">{weather.temperature}°C</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center space-x-1">
                <Wind className="w-3 h-3" />
                <span>{weather.windSpeed} m/s</span>
              </div>
              <div>
                Fuktighet: {weather.humidity}%
              </div>
              <div>
                Sikt: {weather.visibility.toFixed(1)} km
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t">
              Väderdata hjälper till att bedöma synlighet och flygförhållanden
            </div>
          </div>
        ) : error ? (
           <div className="text-sm text-red-600 dark:text-red-500 text-center py-2 flex items-center justify-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-2">
            Väderinformation visas här.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;

