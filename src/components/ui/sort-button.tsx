'use client';

import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type SortOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export type SortDirection = 'asc' | 'desc';

interface SortButtonProps {
  options: SortOption[];
  currentSort: string;
  currentDirection: SortDirection;
  onSortChange: (sort: string, direction: SortDirection) => void;
  className?: string;
}

export function SortButton({
  options,
  currentSort,
  currentDirection,
  onSortChange,
  className,
}: SortButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = options.find((option) => option.value === currentSort);
  const sortLabel = currentOption ? currentOption.label : 'Sort by';

  const handleSortSelect = (value: string) => {
    if (value === currentSort) {
      // Toggle direction if same sort option is selected
      const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
      onSortChange(value, newDirection);
    } else {
      // Default to 'asc' for new sort option
      onSortChange(value, 'asc');
    }
    setIsOpen(false);
  };

  const DirectionIcon = () => {
    if (currentDirection === 'asc') return <ArrowUp className='h-3 w-3' />;
    if (currentDirection === 'desc') return <ArrowDown className='h-3 w-3' />;
    return <ArrowUpDown className='h-3 w-3' />;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={`flex items-center gap-2 ${className}`}
        >
          <ArrowUpDown className='h-4 w-4' />
          <span>{sortLabel}</span>
          <DirectionIcon />
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentSort}
          onValueChange={handleSortSelect}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className='flex items-center gap-2'
            >
              {option.icon}
              <span>{option.label}</span>
              {option.value === currentSort && <DirectionIcon />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Example usage component
export function SortButtonExample() {
  const [currentSort, setCurrentSort] = useState('date');
  const [currentDirection, setCurrentDirection] =
    useState<SortDirection>('desc');

  const sortOptions: SortOption[] = [
    { value: 'date', label: 'Date Created' },
    { value: 'priority', label: 'Priority' },
  ];

  const handleSortChange = (sort: string, direction: SortDirection) => {
    setCurrentSort(sort);
    setCurrentDirection(direction);
    console.log(`Sorting by ${sort} in ${direction} order`);
  };

  return (
    <div className='p-4'>
      <SortButton
        options={sortOptions}
        currentSort={currentSort}
        currentDirection={currentDirection}
        onSortChange={handleSortChange}
      />
    </div>
  );
}
