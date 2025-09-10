import { Card } from '../ui-basic/card';

export const TodoCardSkeleton = () => {
  return (
    <Card className='!bg-card !border-border !flex !flex-row justify-between !gap-3 !rounded-2xl !border !p-3 !transition-all !duration-300 !ease-in-out sm:!items-center sm:!p-4'>
      <div className='flex items-center gap-3 sm:gap-0'>
        {/* Checkbox skeleton */}
        <div className='bg-muted h-5 w-5 animate-pulse rounded sm:mr-2 sm:h-6 sm:w-6'></div>

        <div className='flex-1 sm:flex-1'>
          {/* Title skeleton */}
          <div className='bg-muted h-4 w-3/4 animate-pulse rounded sm:h-5'></div>

          {/* Date and priority skeleton */}
          <div className='mt-1 flex flex-row items-center gap-2'>
            <div className='bg-muted h-3 w-20 animate-pulse rounded sm:h-4 sm:w-24'></div>
            <div className='bg-muted h-5 w-16 animate-pulse rounded-md sm:mx-4 sm:h-6 sm:w-20'></div>
          </div>
        </div>
      </div>

      {/* Actions dropdown skeleton */}
      <div className='flex justify-start'>
        <div className='bg-muted h-8 w-8 animate-pulse rounded'></div>
      </div>
    </Card>
  );
};
