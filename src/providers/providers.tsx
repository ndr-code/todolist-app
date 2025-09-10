'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Toaster } from '@/components/ui-basic/sonner';

import { store } from '@/store/store';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}
