import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.css';
import { Providers } from '../providers/providers';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
