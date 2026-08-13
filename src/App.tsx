import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { OfflineBanner } from '@/components/ui';
import { router } from '@/routes/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <OfflineBanner />
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors closeButton />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
