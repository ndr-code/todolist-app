import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';

import { store } from '@/store/store';


const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'App',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(montserrat.variable, 'antialiased')}>
        <Provider store={store}>
          <QueryClientProvider client={new QueryClient()}>
            {children}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
