'use client';

import { useSelector } from 'react-redux';

import { FilterButton } from '@/components/ui-advance/filter-button-new';
import ScrollToggleButton from '@/components/ui-advance/scroll-toggle-button';
import SearchResult from '@/components/ui-advance/search-result';
import SearchBar from '@/components/ui-advance/searchbar';
import { SortButton } from '@/components/ui-advance/sort-button-new';
import { TodoTabs } from '@/components/ui-advance/todo-tab';
import { ToggleButton } from '@/components/ui-advance/toggle-button';
import ViewConfigButton from '@/components/ui-advance/view-config-button';

import { description, title } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';
import { RootState } from '@/store/store';

export default function Home() {
  const showViewConfig = useSelector(
    (state: RootState) => state.filter.showViewConfig
  );
  const searchText = useSelector((state: RootState) => state.filter.searchText);
  const { clearSearch } = useSearch();

  const hasSearchQuery = !!(searchText && searchText.trim().length > 0);

  return (
    <div className='bg-background dark:bg-background grid min-h-screen grid-rows-[1fr_10px] items-start justify-items-center py-10'>
      <div className='flex w-full max-w-2xl min-w-150 flex-col gap-4 px-4 py-6'>
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
          <SearchBar />
          <ViewConfigButton />
        </div>
        {showViewConfig && (
          <div id='view-config' className='flex items-center justify-end gap-2'>
            <FilterButton />
            <SortButton />
            <ScrollToggleButton />
          </div>
        )}
        <TodoTabs
          forceInactiveState={hasSearchQuery}
          hideContent={hasSearchQuery}
          onTabClick={clearSearch}
        />
        {hasSearchQuery && (
          <div className='mt-6'>
            <SearchResult />
          </div>
        )}
      </div>
      <footer className='flex h-10 w-full items-center justify-center bg-neutral-100 text-center text-xs text-neutral-500 dark:text-neutral-400'>
        © 2025 ndr. All rights reserved.
      </footer>
    </div>
  );
}
