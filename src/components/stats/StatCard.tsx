
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading: boolean;
  isSmallText?: boolean;
}

const StatCard = ({ label, value, icon, isLoading, isSmallText = false }: StatCardProps) => (
  <Card className="border-blue-200 dark:border-slate-700">
    <CardContent className="p-4">
      <div className="flex items-center space-x-2">
        {icon}
        <div>
          {isLoading ? (
            <Skeleton className={`mb-1 ${isSmallText ? 'h-5 w-28' : 'h-7 w-16'}`} />
          ) : (
            <p className={`${isSmallText ? 'text-sm' : 'text-2xl'} font-bold text-slate-900 dark:text-white`}>
              {value}
            </p>
          )}
          <p className="text-xs text-slate-600 dark:text-slate-300">{label}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
