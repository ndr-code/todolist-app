'use client';

import React from 'react';

import { TodoCardSkeleton } from './todo-card';

interface InfiniteScrollSentinelProps {
  hasMore: boolean;
  isLoadingMore: boolean;
  loadingItemsCount?: number;
}

export const InfiniteScrollSentinel = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollSentinelProps
>(({ hasMore, isLoadingMore, loadingItemsCount = 3 }, ref) => {
  if (!hasMore) return null;

  return (
    <div ref={ref} className='w-full'>
      {isLoadingMore && (
        <div className='space-y-3 sm:space-y-4'>
          {Array.from({ length: loadingItemsCount }).map((_, index) => (
            <TodoCardSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}

      {/* Invisible trigger area untuk intersection observer */}
      {!isLoadingMore && hasMore && <div className='h-4 w-full' />}
    </div>
  );
});

InfiniteScrollSentinel.displayName = 'InfiniteScrollSentinel';
