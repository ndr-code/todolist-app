'use client';

import { Settings2 } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui-basic/button';

import { toggleViewConfig } from '@/store/slices/filterSlice';
import { RootState } from '@/store/store';

function ViewConfigButton() {
  const dispatch = useDispatch();
  const showViewConfig = useSelector(
    (state: RootState) => state.filter.showViewConfig
  );

  const handleToggle = () => {
    dispatch(toggleViewConfig());
  };

  return (
    <Button
      variant={showViewConfig ? 'default' : 'outline'}
      className='h-12 min-w-12 gap-1 px-3 text-xs sm:gap-2 sm:px-4 sm:text-sm'
      onClick={handleToggle}
    >
      <Settings2 className='h-3 w-3 sm:h-4 sm:w-4' />
      <span className='hidden sm:inline'>Config</span>
    </Button>
  );
}

export default ViewConfigButton;
