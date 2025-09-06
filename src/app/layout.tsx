import { clsx } from 'clsx';
import type { Metadata } from 'next';

import './globals.css';
import { Providers } from '../providers/providers';

export const metadata: Metadata = {
  title: 'To Do List App',
  description: 'A simple todo list application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx('antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
