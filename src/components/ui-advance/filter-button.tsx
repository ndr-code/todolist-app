'use client';

import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { IoFilterOutline } from 'react-icons/io5';

import { Button } from '@/components/ui-basic/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from '@/components/ui-basic/dropdown-menu';

export type FilterState = {
  completed: {
    active: boolean;
    completed: boolean;
  };
  priority: {
    low: boolean;
    medium: boolean;
    high: boolean;
  };
  dateRange: {
    gte: boolean; // Greater than or equal (from date onwards)
    lte: boolean; // Less than or equal (up to date)
  };
};

interface FilterButtonProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export function FilterButton1({
  filters,
  onFilterChange,
  className,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Count active filters
  const activeFiltersCount =
    Object.values(filters.completed).filter(Boolean).length +
    Object.values(filters.priority).filter(Boolean).length +
    Object.values(filters.dateRange).filter(Boolean).length;

  const handleCompletedChange = (
    key: keyof FilterState['completed'],
    checked: boolean
  ) => {
    onFilterChange({
      ...filters,
      completed: {
        ...filters.completed,
        [key]: checked,
      },
    });
  };

  const handlePriorityChange = (
    key: keyof FilterState['priority'],
    checked: boolean
  ) => {
    onFilterChange({
      ...filters,
      priority: {
        ...filters.priority,
        [key]: checked,
      },
    });
  };

  const handleDateRangeChange = (
    key: keyof FilterState['dateRange'],
    checked: boolean
  ) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: checked,
      },
    });
  };

  const handleClearAllFilters = () => {
    onFilterChange({
      completed: {
        active: false,
        completed: false,
      },
      priority: {
        low: false,
        medium: false,
        high: false,
      },
      dateRange: {
        gte: false,
        lte: false,
      },
    });
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={`flex items-center gap-2 ${className} relative h-12 w-24 justify-start rounded-xl`}
        >
          <IoFilterOutline className='h-4 w-4' />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <span className='bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs'>
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-border dark:bg-border' />

        {/* By Completed Status */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>By Completed</span>
            {(filters.completed.active || filters.completed.completed) && (
              <Check className='ml-auto h-4 w-4' />
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={filters.completed.active}
              onCheckedChange={(checked) =>
                handleCompletedChange('active', checked)
              }
            >
              Active (Not completed)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.completed.completed}
              onCheckedChange={(checked) =>
                handleCompletedChange('completed', checked)
              }
            >
              Completed
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* By Priority */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>By Priority</span>
            {(filters.priority.low ||
              filters.priority.medium ||
              filters.priority.high) && <Check className='ml-auto h-4 w-4' />}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={filters.priority.low}
              onCheckedChange={(checked) =>
                handlePriorityChange('low', checked)
              }
            >
              Low Priority
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.priority.medium}
              onCheckedChange={(checked) =>
                handlePriorityChange('medium', checked)
              }
            >
              Medium Priority
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.priority.high}
              onCheckedChange={(checked) =>
                handlePriorityChange('high', checked)
              }
            >
              High Priority
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* By Date Range */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>By Date Range</span>
            {(filters.dateRange.gte || filters.dateRange.lte) && (
              <Check className='ml-auto h-4 w-4' />
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange.gte}
              onCheckedChange={(checked) =>
                handleDateRangeChange('gte', checked)
              }
            >
              From Today Onwards (≥)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange.lte}
              onCheckedChange={(checked) =>
                handleDateRangeChange('lte', checked)
              }
            >
              Up to Today (≤)
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Clear All Filters */}
        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator className='bg-border dark:bg-border' />
            <DropdownMenuItem onClick={handleClearAllFilters}>
              <X className='mr-2 h-4 w-4' />
              <span>Clear All Filters</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FilterButton() {
  const [filters, setFilters] = useState<FilterState>({
    completed: {
      active: false,
      completed: false,
    },
    priority: {
      low: false,
      medium: false,
      high: false,
    },
    dateRange: {
      gte: false,
      lte: false,
    },
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className=''>
      <FilterButton1 filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
}
