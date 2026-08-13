import { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminRegisterPage } from '@/pages/admin/AdminRegisterPage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { ErrorPage } from '@/components/ui';
import { ADMIN_ROUTES } from '@/constants/routes';

// Lazy load admin pages for code-splitting
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminCustomersPage = lazy(() => import('@/pages/admin/AdminCustomersPage').then(m => ({ default: m.AdminCustomersPage })));
const AdminPlansPage = lazy(() => import('@/pages/admin/AdminPlansPage').then(m => ({ default: m.AdminPlansPage })));
const AdminPaymentsPage = lazy(() => import('@/pages/admin/AdminPaymentsPage').then(m => ({ default: m.AdminPaymentsPage })));
const AdminRoutersPage = lazy(() => import('@/pages/admin/AdminRoutersPage').then(m => ({ default: m.AdminRoutersPage })));
const AdminReportsPage = lazy(() => import('@/pages/admin/AdminReportsPage').then(m => ({ default: m.AdminReportsPage })));
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

// Loading fallback for lazy-loaded routes
function AdminLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AdminLoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <AdminRegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Suspense fallback={<AdminLoadingFallback />}><AdminDashboardPage /></Suspense> },
      { path: 'customers', element: <Suspense fallback={<AdminLoadingFallback />}><AdminCustomersPage /></Suspense> },
      { path: 'plans', element: <Suspense fallback={<AdminLoadingFallback />}><AdminPlansPage /></Suspense> },
      { path: 'payments', element: <Suspense fallback={<AdminLoadingFallback />}><AdminPaymentsPage /></Suspense> },
      { path: 'routers', element: <Suspense fallback={<AdminLoadingFallback />}><AdminRoutersPage /></Suspense> },
      { path: 'reports', element: <Suspense fallback={<AdminLoadingFallback />}><AdminReportsPage /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<AdminLoadingFallback />}><AdminSettingsPage /></Suspense> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
