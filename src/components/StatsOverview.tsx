
import { TrendingUp, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const StatsOverview = () => {
  const { data: statsData, isLoading: isLoadingStats, isError } = useQuery({
    queryKey: ['statsOverview'],
    queryFn: async () => {
      const totalReportsPromise = supabase
        .from('reports')
        .select('*', { count: 'exact', head: true });
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayReportsPromise = supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());
        
      const activeAlertsPromise = supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .in('status', ['new', 'under_review']);

      const recentActivityPromise = supabase
        .from('reports')
        .select('created_at, description, details')
        .order('created_at', { ascending: false })
        .limit(3);

      const [
        { count: totalReports, error: totalError },
        { count: todayReports, error: todayError },
        { count: activeAlerts, error: activeError },
        { data: recentActivityData, error: recentError }
      ] = await Promise.all([totalReportsPromise, todayReportsPromise, activeAlertsPromise, recentActivityPromise]);

      if (totalError || todayError || activeError || recentError) {
        console.error({ totalError, todayError, activeError, recentError });
        throw new Error('Failed to fetch stats data.');
      }

      const lastUpdate = recentActivityData && recentActivityData.length > 0 ? recentActivityData[0].created_at : null;

      const recentActivity = recentActivityData?.map(r => {
        let details_obj = r.details;
        if (typeof details_obj === 'string') {
          try {
            details_obj = JSON.parse(details_obj);
          } catch (e) {
            console.error("Failed to parse report details", e);
            details_obj = {};
          }
        }
        return { ...r, details: details_obj };
      });

      return {
        totalReports: totalReports ?? 0,
        todayReports: todayReports ?? 0,
        activeAlerts: activeAlerts ?? 0,
        lastUpdate,
        recentActivity
      };
    },
    refetchInterval: 60000, // Refetch every 60 seconds
  });

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

  if (isError) {
    return (
      <Card className="border-red-200 dark:border-red-700">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 dark:text-red-200">Fel vid hämtning av data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 dark:text-red-300">Kunde inte ladda statistik. Försök att ladda om sidan.</p>
        </CardContent>
      </Card>
    );
  }

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
            {isLoadingStats ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg animate-pulse">
                  <div className="flex items-center space-x-3 w-full">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <div className="space-y-2 flex-grow">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))
            ) : statsData?.recentActivity && statsData.recentActivity.length > 0 ? (
              statsData.recentActivity.map((activity, index) => {
                const priority = (activity.details as { urgencyLevel: string })?.urgencyLevel || 'low';
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {activity.description || "Ingen beskrivning angiven"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {format(new Date(activity.created_at), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(priority)}>
                      {getPriorityText(priority)}
                    </Badge>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400 py-4">Ingen nylig aktivitet.</p>
            )}
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
                    {isLoadingStats ? <Skeleton className="h-7 w-16 mb-1" /> : <p className="text-2xl font-bold text-slate-900 dark:text-white">{statsData?.totalReports.toLocaleString()}</p>}
                    <p className="text-xs text-slate-600 dark:text-slate-300">Totala rapporter</p>
                  </div>
                </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                 <div>
                    {isLoadingStats ? <Skeleton className="h-7 w-12 mb-1" /> : <p className="text-2xl font-bold text-slate-900 dark:text-white">{statsData?.todayReports}</p>}
                    <p className="text-xs text-slate-600 dark:text-slate-300">Idag</p>
                  </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  {isLoadingStats ? <Skeleton className="h-7 w-8 mb-1" /> : <p className="text-2xl font-bold text-slate-900 dark:text-white">{statsData?.activeAlerts}</p>}
                  <p className="text-xs text-slate-600 dark:text-slate-300">Aktiva varningar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                    {isLoadingStats || !statsData?.lastUpdate ? <Skeleton className="h-5 w-28 mb-1" /> : <p className="text-sm font-bold text-slate-900 dark:text-white">{format(new Date(statsData.lastUpdate), 'yyyy-MM-dd HH:mm')}</p>}
                  <p className="text-xs text-slate-600 dark:text-slate-300">Senaste uppdatering</p>
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
