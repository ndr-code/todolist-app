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
      className='h-12 gap-2'
      onClick={handleToggle}
    >
      <Settings2 className='h-4 w-4' />
      View Config
    </Button>
  );
}

export default ViewConfigButton;
