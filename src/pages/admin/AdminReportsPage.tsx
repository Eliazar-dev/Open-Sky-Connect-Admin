import { useState } from 'react';
import { Dropdown, StatCardSkeleton } from '@/components/ui';
import { StatCard } from '@/components/ui/StatCard';
import { useDashboardStats } from '@/hooks/useAdminData';
import { formatCurrency } from '@/utils/format';

const monthOptions = [
  { label: 'This Month', value: 'this-month' },
  { label: 'Last Month', value: 'last-month' },
  { label: 'Last 3 Months', value: 'last-3-months' },
];

export function AdminReportsPage() {
  const [month, setMonth] = useState('this-month');
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Dropdown options={monthOptions} value={month} onChange={setMonth} className="w-40" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isLoading || !stats ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard label="Total Revenue" value={formatCurrency(stats.revenueThisMonth)} changePct={stats.revenueChangePct} />
            <StatCard label="Total Customers" value={stats.totalCustomers.toLocaleString()} changePct={8} />
          </>
        )}
      </div>

      {stats && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Overview</h3>
          <div className="text-sm text-slate-500">Chart component coming soon</div>
        </div>
      )}
    </div>
  );
}
