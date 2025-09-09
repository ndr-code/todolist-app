import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { Button } from '../ui-basic/button';

interface TodosPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  className?: string;
  showWhenSinglePage?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  variant?: 'simple' | 'detailed';
}

function TodosPagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  className = '',
  showWhenSinglePage = false,
  totalItems = 0,
  itemsPerPage = 5,
  variant = 'simple',
}: TodosPaginationProps) {
  // Don't render if only one page and showWhenSinglePage is false
  if (totalPages <= 1 && !showWhenSinglePage) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (variant === 'detailed') {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <span className='text-muted-foreground text-sm'>
          Showing {Math.min(startItem, totalItems)}-{endItem} of {totalItems}{' '}
          {totalItems === 1 ? 'item' : 'items'}
        </span>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className='flex items-center gap-1'
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className='flex items-center gap-1'
          >
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        variant='outline'
        size='sm'
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className='flex items-center gap-1'
      >
        <ChevronLeft className='h-4 w-4' />
        Previous
      </Button>

      <span className='text-muted-foreground px-3 text-sm'>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant='outline'
        size='sm'
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className='flex items-center gap-1'
      >
        Next
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default TodosPagination;
