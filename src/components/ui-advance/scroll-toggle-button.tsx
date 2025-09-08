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
      className='flex h-12 items-center gap-2 rounded-xl px-3'
      title={
        isPagination ? 'Switch to Infinite Scroll' : 'Switch to Pagination'
      }
    >
      {isPagination ? (
        <>
          <MoreHorizontal className='h-4 w-4' />
          <span className='text-xs'>Pages Mode</span>
        </>
      ) : (
        <>
          <List className='h-4 w-4' />
          <span className='text-xs'>Scroll Mode</span>
        </>
      )}
    </Button>
  );
}

export default ScrollToggleButton;
