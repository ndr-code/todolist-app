import { FilterButton } from '@/components/ui-advance/filter-button';
import SearchBar from '@/components/ui-advance/searchbar';
import { SortButton } from '@/components/ui-advance/sort-button';
import { TodoTabs } from '@/components/ui-advance/todo-tabs';
import { ToggleButton } from '@/components/ui-advance/toggle-button';

import { description, title } from '@/constants/data';

export default function Home() {
  return (
    <div className='bg-background dark:bg-background grid min-h-screen grid-rows-[80px_1fr_40px] items-start justify-items-center py-10'>
      <header className='mb-10 flex h-10 items-center justify-center rounded-full bg-neutral-200 px-20 text-center font-bold dark:text-white'>
        To Do List App
      </header>
      <div className='flex w-full max-w-2xl min-w-150 flex-col gap-6 px-4 py-6'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h1 className='display-sm-bold pb-2 font-bold dark:text-white'>
              {title}
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>{description}</p>
          </div>
          <ToggleButton />
        </div>
        <div className='mb-6 flex flex-row gap-4'>
          <SearchBar />
          <FilterButton />
          <SortButton />
        </div>
        <TodoTabs />
      </div>
      <footer className='flex h-10 w-full items-center justify-center text-center text-xs text-neutral-500 dark:text-neutral-400'>
        © 2025 ndr. All rights reserved.
      </footer>
    </div>
  );
}
