
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RecentActivity from './stats/RecentActivity';
import StatsGrid from './stats/StatsGrid';

const StatsOverview = () => {
  const { t } = useTranslation();
  const { data: statsData, isLoading: isLoadingStats, isError, error } = useQuery({
    queryKey: ['statsOverview'],
    queryFn: async () => {
      console.log("Fetching stats data...");
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
        console.error("Supabase query errors:", { totalError, todayError, activeError, recentError });
        throw new Error('Failed to fetch stats data.');
      }
      
      console.log("Successfully fetched stats data:", { totalReports, todayReports, activeAlerts });

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

  console.log('StatsOverview component state:', { isLoading: isLoadingStats, isError, error, data: statsData });

  if (isError) {
    return (
      <Card className="border-red-200 dark:border-red-700">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 dark:text-red-200">{t('statsOverview.errorTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 dark:text-red-300">{t('statsOverview.errorDescription')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <RecentActivity activities={statsData?.recentActivity} isLoading={isLoadingStats} />
      <StatsGrid stats={statsData} isLoading={isLoadingStats} />
    </div>
  );
};

export default StatsOverview;
