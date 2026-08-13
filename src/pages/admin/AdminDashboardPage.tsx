import { StatCard } from '@/components/ui/StatCard';
import { StatCardSkeleton } from '@/components/ui';
import { useDashboardStats } from '@/hooks/useAdminData';
import { formatCurrency } from '@/utils/format';

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total Customers" value={stats.totalCustomers.toLocaleString()} />
            <StatCard label="Active Users" value={stats.activeUsers.toLocaleString()} />
            <StatCard label="Revenue (This Month)" value={formatCurrency(stats.revenueThisMonth)} changePct={stats.revenueChangePct} />
            <StatCard label="Today's Revenue" value={formatCurrency(stats.todayRevenue)} changePct={stats.todayRevenueChangePct} />
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
