'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
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

import { setSort, setOrder } from '@/store/slices/filterSlice';
import { RootState } from '@/store/store';

export function SortButton() {
  const dispatch = useDispatch();
  const { sort, order } = useSelector((state: RootState) => state.filter);

  const handleSortChange = (newSort: 'date' | 'priority') => {
    dispatch(setSort(newSort));
  };

  const handleOrderChange = (newOrder: 'asc' | 'desc') => {
    dispatch(setOrder(newOrder));
  };

  const getSortIcon = () => {
    if (order === 'asc') return <ArrowUp className='h-3 w-3 sm:h-4 sm:w-4' />;
    if (order === 'desc')
      return <ArrowDown className='h-3 w-3 sm:h-4 sm:w-4' />;
    return <ArrowUpDown className='h-3 w-3 sm:h-4 sm:w-4' />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex h-12 w-full min-w-20 justify-center gap-1 px-2 text-xs sm:min-w-25 sm:gap-2 sm:px-4 sm:text-sm'
        >
          {getSortIcon()}
          <span className='hidden sm:inline'>
            {sort === 'date' ? 'Date' : 'Priority'}
          </span>
          <span className='sm:hidden'>{sort === 'date' ? 'Date' : 'Prio'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={sort === 'date'}
          onCheckedChange={() => handleSortChange('date')}
        >
          Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sort === 'priority'}
          onCheckedChange={() => handleSortChange('priority')}
        >
          Priority
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Order</DropdownMenuLabel>

        <DropdownMenuCheckboxItem
          checked={order === 'asc'}
          onCheckedChange={() => handleOrderChange('asc')}
        >
          Ascending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={order === 'desc'}
          onCheckedChange={() => handleOrderChange('desc')}
        >
          Descending
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
