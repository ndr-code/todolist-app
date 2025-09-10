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
    <div className='bg-background dark:bg-background grid min-h-screen grid-rows-[1fr_10px] items-start justify-items-center py-4 sm:py-10'>
      <div className='flex w-full max-w-2xl min-w-0 flex-col gap-3 px-3 py-4 sm:gap-4 sm:px-4 sm:py-6 md:min-w-150'>
        <div className='flex flex-row items-center justify-between gap-3 sm:gap-4'>
          <div className='flex-1'>
            <h1 className='display-sm-bold pb-1 sm:pb-2 dark:text-white'>
              {title}
            </h1>
            <p className='text-sm text-gray-600 sm:text-base dark:text-gray-400'>
              {description}
            </p>
          </div>
          <div className='flex justify-end sm:justify-start'>
            <ToggleButton />
          </div>
        </div>
        <div className='flex flex-row gap-3 sm:gap-4'>
          <div className='flex-1'>
            <SearchBar />
          </div>
          <ViewConfigButton />
        </div>
        {showViewConfig && (
          <div
            id='view-config'
            className='flex w-full items-center justify-center gap-2'
          >
            <div className='flex w-full gap-2'>
              <div className='flex-1'>
                <FilterButton />
              </div>
              <div className='flex-1'>
                <SortButton />
              </div>
              <div className='flex-1'>
                <ScrollToggleButton />
              </div>
            </div>
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
