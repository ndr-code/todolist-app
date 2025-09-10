'use client';

import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '../ui-basic/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui-basic/dropdown-menu';

interface TodoActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
  isDeleting?: boolean;
}

export function TodoActionsDropdown({
  onEdit,
  onDelete,
  disabled = false,
  isDeleting = false,
}: TodoActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 scale-150 p-0'
          disabled={disabled}
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem
          onClick={onEdit}
          className='cursor-pointer'
          disabled={disabled}
        >
          <Edit className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className='text-destructive focus:text-destructive cursor-pointer'
          disabled={disabled}
        >
          <Trash2 className='mr-2 h-4 w-4' />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
