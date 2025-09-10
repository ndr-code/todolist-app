'use client';

import { List, MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setViewMode } from '@/store/slices/filterSlice';
import { RootState } from '@/store/store';

import { Button } from '../ui-basic/button';

function ScrollToggleButton() {
  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.filter.viewMode);

  const handleToggle = () => {
    const newMode = viewMode === 'page' ? 'scroll' : 'page';
    dispatch(setViewMode(newMode));
  };

  const isPagination = viewMode === 'page';

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={handleToggle}
      className='flex h-12 w-full min-w-20 items-center justify-center gap-1 rounded-xl px-2 text-xs sm:min-w-25 sm:gap-2 sm:px-3 sm:text-sm'
      title={
        isPagination ? 'Switch to Infinite Scroll' : 'Switch to Pagination'
      }
    >
      {isPagination ? (
        <>
          <MoreHorizontal className='h-3 w-3 sm:h-4 sm:w-4' />
          <span className='hidden sm:inline'>Pages</span>
          <span className='sm:hidden'>Page</span>
        </>
      ) : (
        <>
          <List className='h-3 w-3 sm:h-4 sm:w-4' />
          <span>Scroll</span>
        </>
      )}
    </Button>
  );
}

export default ScrollToggleButton;
