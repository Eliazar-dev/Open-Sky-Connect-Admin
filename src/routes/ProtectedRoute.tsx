import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAdminAuthenticated } = useAdminAuthContext();
  if (!isAdminAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
