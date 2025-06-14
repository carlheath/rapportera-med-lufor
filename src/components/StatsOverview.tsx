
import { TrendingUp, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StatsOverview = () => {
  // Mock data - in real implementation, fetch from API
  const stats = {
    totalReports: 1247,
    todayReports: 23,
    activeAlerts: 3,
    lastUpdate: '2024-06-14 14:32'
  };

  const recentActivity = [
    { location: 'Stockholm, Södermalm', time: '13:45', priority: 'high' },
    { location: 'Göteborg, Centrum', time: '12:23', priority: 'medium' },
    { location: 'Malmö, Västra Hamnen', time: '11:56', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-600 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-700 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:border-yellow-600 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-700 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-600 dark:bg-green-900/20';
      default:
        return 'text-gray-700 border-gray-300 bg-gray-50';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Hög';
      case 'medium':
        return 'Medel';
      case 'low':
        return 'Låg';
      default:
        return 'Okänd';
    }
  };

  return (
    <div className="space-y-8">
      {/* Recent Activity Module */}
      <Card className="border-blue-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 dark:text-white">
            Senaste Aktivitet
          </CardTitle>
          <CardDescription>
            En översikt av de senast inkomna observationerna.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.location}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getPriorityColor(activity.priority)}>
                  {getPriorityText(activity.priority)}
                </Badge>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Visa alla rapporter →
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Module */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Statistiköversikt</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.totalReports.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Totala rapporter
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.todayReports}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Idag
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.activeAlerts}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Aktiva varningar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {stats.lastUpdate}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Senaste uppdatering
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
