'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position={isMobile ? 'top-center' : 'top-right'}
      style={
        {
          '--normal-bg': 'var(--accent-green)',
          '--normal-text': 'white',
          '--normal-border': 'var(--accent-green)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-accent-green group-[.toaster]:text-white group-[.toaster]:border-accent-green group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-white/90',
          actionButton:
            'group-[.toast]:bg-white group-[.toast]:text-accent-green',
          cancelButton: 'group-[.toast]:bg-white/20 group-[.toast]:text-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
