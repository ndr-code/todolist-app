'use client';
import { useState, useEffect } from 'react';

interface ToggleButtonProps {
  className?: string;
}

export function ToggleButton({ className = '' }: ToggleButtonProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Container */}
      <div
        onClick={toggleDarkMode}
        className='border-input dark:bg-input/30 dark:hover:bg-input/50 relative flex h-12 w-24 cursor-pointer items-center rounded-2xl border bg-neutral-300 p-1 transition-colors duration-300'
      >
        {/* Light Mode Icon (Left) */}
        <div
          className={`absolute top-1 left-1 z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${!isDark ? 'text-gray-700' : 'text-gray-500'}`}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <circle cx='12' cy='12' r='5' />
            <path d='M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
          </svg>
        </div>

        {/* Dark Mode Icon (Right) */}
        <div
          className={`absolute top-1 right-1 z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-500'}`}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
          </svg>
        </div>

        {/* Moving Toggle Circle */}
        <div
          className={`absolute top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-lg bg-blue-600 shadow-lg transition-transform duration-300 ease-in-out ${
            isDark ? 'translate-x-13' : 'translate-x-1'
          }`}
        >
          <div className='flex h-full w-full items-center justify-center text-white'>
            {isDark ? (
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
              </svg>
            ) : (
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <circle cx='12' cy='12' r='5' />
                <path d='M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
