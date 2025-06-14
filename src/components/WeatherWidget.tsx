
import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    if (!location) return;
    
    setIsLoading(true);
    try {
      // Simulate weather API call - in real implementation, use OpenWeatherMap API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data
      const mockWeather: WeatherData = {
        temperature: Math.round(Math.random() * 20 + 5), // 5-25°C
        description: ['Klart', 'Delvis molnigt', 'Molnigt', 'Lätt regn'][Math.floor(Math.random() * 4)],
        windSpeed: Math.round(Math.random() * 15 + 2), // 2-17 m/s
        humidity: Math.round(Math.random() * 40 + 40), // 40-80%
        visibility: Math.round(Math.random() * 5 + 5), // 5-10 km
        icon: ['sun', 'cloud', 'cloud-rain'][Math.floor(Math.random() * 3)]
      };
      
      setWeather(mockWeather);
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'cloud-rain':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-500" />;
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
                <span className="text-sm font-medium">{weather.description}</span>
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
                Sikt: {weather.visibility} km
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t">
              Väderdata hjälper till att bedöma synlighet och flygförhållanden
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-2">
            Kunde inte hämta väderdata
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
