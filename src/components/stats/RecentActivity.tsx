
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import React from 'react';

type Activity = {
  created_at: string;
  description: string | null;
  details: { urgencyLevel?: string } | any;
};

interface RecentActivityProps {
  activities: Activity[] | undefined;
  isLoading: boolean;
}

const RecentActivity = ({ activities, isLoading }: RecentActivityProps) => {
  const { t } = useTranslation();

  const getPriorityColor = (priority?: string) => {
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

  const getPriorityText = (priority?: string) => {
    switch (priority) {
      case 'high':
        return t('statsOverview.priorityHigh');
      case 'medium':
        return t('statsOverview.priorityMedium');
      case 'low':
        return t('statsOverview.priorityLow');
      default:
        return t('statsOverview.priorityUnknown');
    }
  };

  return (
    <Card className="border-blue-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 dark:text-white">
          {t('statsOverview.recentActivityTitle')}
        </CardTitle>
        <CardDescription>
          {t('statsOverview.recentActivityDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
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
          ) : activities && activities.length > 0 ? (
            activities.map((activity, index) => {
              const priority = activity.details?.urgencyLevel || 'low';
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {activity.description || t('statsOverview.noDescription')}
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
            <p className="text-center text-slate-500 dark:text-slate-400 py-4">{t('statsOverview.noRecentActivity')}</p>
          )}
        </div>
        <div className="text-center mt-6">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            {t('statsOverview.viewAllReports')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
