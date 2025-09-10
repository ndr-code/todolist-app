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
      <div
        className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${className}`}
      >
        <span className='text-muted-foreground text-center text-xs sm:text-left sm:text-sm'>
          Showing {Math.min(startItem, totalItems)}-{endItem} of {totalItems}{' '}
          {totalItems === 1 ? 'item' : 'items'}
        </span>
        <div className='flex justify-center gap-1 sm:gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className='flex h-8 items-center gap-1 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm'
          >
            <ChevronLeft className='h-3 w-3 sm:h-4 sm:w-4' />
            <span className='hidden sm:inline'>Previous</span>
            <span className='sm:hidden'>Prev</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className='flex h-8 items-center gap-1 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm'
          >
            <span className='hidden sm:inline'>Next</span>
            <span className='sm:hidden'>Next</span>
            <ChevronRight className='h-3 w-3 sm:h-4 sm:w-4' />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center gap-1 sm:gap-2 ${className}`}
    >
      <Button
        variant='outline'
        size='sm'
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className='flex h-8 items-center gap-1 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm'
      >
        <ChevronLeft className='h-3 w-3 sm:h-4 sm:w-4' />
        <span className='hidden sm:inline'>Previous</span>
        <span className='sm:hidden'>Prev</span>
      </Button>

      <span className='text-muted-foreground px-2 text-xs sm:px-3 sm:text-sm'>
        <span className='hidden sm:inline'>
          Page {currentPage} of {totalPages}
        </span>
        <span className='sm:hidden'>
          {currentPage}/{totalPages}
        </span>
      </span>

      <Button
        variant='outline'
        size='sm'
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className='flex h-8 items-center gap-1 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm'
      >
        <span className='hidden sm:inline'>Next</span>
        <span className='sm:hidden'>Next</span>
        <ChevronRight className='h-3 w-3 sm:h-4 sm:w-4' />
      </Button>
    </div>
  );
}

export default TodosPagination;
