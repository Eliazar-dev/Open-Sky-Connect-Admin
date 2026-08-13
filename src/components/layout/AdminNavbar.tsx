import { Menu } from 'lucide-react';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';

interface AdminNavbarProps {
  title: string;
  onMenuClick: () => void;
}

export function AdminNavbar({ title, onMenuClick }: AdminNavbarProps) {
  const { adminUser } = useAdminAuthContext();

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-ink-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-ink-900">{adminUser?.name ?? 'Admin'}</p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
          {(adminUser?.name ?? 'A').charAt(0)}
        </div>
      </div>
    </header>
  );
}
