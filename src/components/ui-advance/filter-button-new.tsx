'use client';

import { IoFilterOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui-basic/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui-basic/dropdown-menu';

import {
  setCompleted,
  setPriority,
  resetFilter,
} from '@/store/slices/filterSlice';
import { RootState } from '@/store/store';

export function FilterButton() {
  const dispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filter);

  // Count active filters
  const activeFiltersCount = [
    filterState.completed !== 'all',
    filterState.priority !== 'all',
    filterState.dateGte,
    filterState.dateLte,
    filterState.searchText,
  ].filter(Boolean).length;

  const handleCompletedFilter = (value: 'all' | 'active' | 'completed') => {
    dispatch(setCompleted(value));
  };

  const handlePriorityFilter = (value: 'LOW' | 'MEDIUM' | 'HIGH' | 'all') => {
    dispatch(setPriority(value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilter());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='relative flex h-12 w-full justify-center gap-1 px-2 text-xs sm:gap-3 sm:px-4 sm:text-sm'
        >
          <IoFilterOutline className='h-3 w-3 sm:h-4 sm:w-4' />
          <span className='hidden sm:inline'>Filter</span>
          <span className='sm:hidden'>Filter</span>
          {activeFiltersCount > 0 && (
            <span className='bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs sm:-top-2 sm:-right-2 sm:h-5 sm:w-5'>
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=''>
        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className='text-muted-foreground text-xs uppercase'>
          Status
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filterState.completed === 'all'}
          onCheckedChange={() => handleCompletedFilter('all')}
        >
          All Tasks
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterState.completed === 'active'}
          onCheckedChange={() => handleCompletedFilter('active')}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterState.completed === 'completed'}
          onCheckedChange={() => handleCompletedFilter('completed')}
        >
          Completed
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className='text-muted-foreground text-xs uppercase'>
          Priority
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filterState.priority === 'all'}
          onCheckedChange={() => handlePriorityFilter('all')}
        >
          All Priorities
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterState.priority === 'HIGH'}
          onCheckedChange={() => handlePriorityFilter('HIGH')}
        >
          High
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterState.priority === 'MEDIUM'}
          onCheckedChange={() => handlePriorityFilter('MEDIUM')}
        >
          Medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterState.priority === 'LOW'}
          onCheckedChange={() => handlePriorityFilter('LOW')}
        >
          Low
        </DropdownMenuCheckboxItem>

        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <Button
              variant='ghost'
              className='w-full justify-start'
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
