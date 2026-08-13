import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wifi,
  CreditCard,
  Router as RouterIcon,
  BarChart3,
  Settings,
} from 'lucide-react';
import { Logo } from '@/components/ui';
import { ADMIN_ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const navItems = [
  { to: ADMIN_ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ADMIN_ROUTES.CUSTOMERS, label: 'Customers', icon: Users },
  { to: ADMIN_ROUTES.PLANS, label: 'Internet Plans', icon: Wifi },
  { to: ADMIN_ROUTES.PAYMENTS, label: 'Payments', icon: CreditCard },
  { to: ADMIN_ROUTES.ROUTERS, label: 'Routers', icon: RouterIcon },
  { to: ADMIN_ROUTES.REPORTS, label: 'Reports', icon: BarChart3 },
  { to: ADMIN_ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-60 flex-shrink-0 flex-col bg-ink-900 lg:flex">
      <div className="px-5 py-6">
        <Logo width={86} variant="light" />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-brand-500 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-5 py-5 text-xs text-white/30">© {new Date().getFullYear()} OpenSky Connect</div>
    </aside>
  );
}
