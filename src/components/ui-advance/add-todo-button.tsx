'use client';

import { Plus } from 'lucide-react';
import * as React from 'react';

import { AddTodosDialog } from './add-todos-dialog';
import { Button } from '../ui-basic/button';

interface AddTodoButtonProps {
  defaultDate?: Date;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  children?: React.ReactNode;
}

export function AddTodoButton({
  defaultDate,
  size = 'sm',
  variant = 'default',
  className = '',
  children,
}: AddTodoButtonProps) {
  return (
    <AddTodosDialog defaultDate={defaultDate}>
      <Button size={size} variant={variant} className={`gap-2 ${className}`}>
        <Plus className='h-4 w-4' />
        {children || 'Add Task'}
      </Button>
    </AddTodosDialog>
  );
}
