
import { TrendingUp, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';
import { format } from 'date-fns';

interface StatsGridProps {
  stats: {
    totalReports: number;
    todayReports: number;
    activeAlerts: number;
    lastUpdate: string | null;
  } | undefined;
  isLoading: boolean;
}

const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{t('statsOverview.statsTitle')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label={t('statsOverview.totalReports')}
          value={stats?.totalReports.toLocaleString() ?? 0}
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          isLoading={isLoading}
        />
        <StatCard
          label={t('statsOverview.today')}
          value={stats?.todayReports ?? 0}
          icon={<Clock className="w-5 h-5 text-green-600" />}
          isLoading={isLoading}
        />
        <StatCard
          label={t('statsOverview.activeAlerts')}
          value={stats?.activeAlerts ?? 0}
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
          isLoading={isLoading}
        />
        <StatCard
          label={t('statsOverview.lastUpdate')}
          value={stats?.lastUpdate ? format(new Date(stats.lastUpdate), 'yyyy-MM-dd HH:mm') : 'N/A'}
          icon={<MapPin className="w-5 h-5 text-purple-600" />}
          isLoading={isLoading}
          isSmallText={true}
        />
      </div>
    </div>
  );
};

export default StatsGrid;
