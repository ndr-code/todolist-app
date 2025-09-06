import { Search } from 'lucide-react';

import { SortButton } from '@/components/ui-advance/sort-button';
import { Input } from '@/components/ui-basic/input';
import { ToggleButton } from '@/components/ui-basic/toggle-button';

import { description, title } from '@/constants/data';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[80px_1fr_40px] items-start justify-items-center bg-neutral-100 py-10 dark:bg-neutral-900'>
      <header className='mb-10 flex h-10 items-center justify-center rounded-full bg-neutral-300 px-20 text-center font-bold dark:bg-neutral-800 dark:text-white'>
        To Do List App
      </header>
      <div className='flex min-w-150 flex-col gap-6 py-6'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h1 className='display-sm-bold pb-2 font-bold dark:text-white'>
              {title}
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>{description}</p>
          </div>
          <ToggleButton />
        </div>
        <div className='flex flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input placeholder='Search...' className='pl-10' />
          </div>
          <SortButton />
        </div>
      </div>
      <footer className='flex h-10 w-full items-center justify-center text-center text-xs text-neutral-500 dark:text-neutral-400'>
        © 2025 ndr. All rights reserved.
      </footer>
    </div>
  );
}
