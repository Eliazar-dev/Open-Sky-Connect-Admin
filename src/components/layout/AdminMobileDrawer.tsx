import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, LayoutDashboard, Users, Wifi, CreditCard, Router as RouterIcon, BarChart3, Settings } from 'lucide-react';
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

interface AdminMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminMobileDrawer({ isOpen, onClose }: AdminMobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink-900/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 flex h-full w-64 flex-col bg-ink-900"
          >
            <div className="flex items-center justify-between px-5 py-6">
              <Logo width={80} variant="light" />
              <button onClick={onClose} className="text-white/60 hover:text-white" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
