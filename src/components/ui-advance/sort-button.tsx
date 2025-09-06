'use client';

import { ArrowUp, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui-basic/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui-basic/dropdown-menu';

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

export function SortButton1({
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
    if (currentDirection === 'asc')
      return (
        <svg
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill='none'
          className='h-3 w-3'
        >
          <rect x='2' y='17' width='20' height='2' rx='1' fill='currentColor' />
          <rect x='5' y='11' width='14' height='2' rx='1' fill='currentColor' />
          <rect x='8' y='5' width='8' height='2' rx='1' fill='currentColor' />
        </svg>
      );
    if (currentDirection === 'desc')
      return (
        <svg
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill='none'
          className='h-3 w-3'
        >
          <rect x='2' y='5' width='20' height='2' rx='1' fill='currentColor' />
          <rect x='5' y='11' width='14' height='2' rx='1' fill='currentColor' />
          <rect x='8' y='17' width='8' height='2' rx='1' fill='currentColor' />
        </svg>
      );
    return <ArrowUpDown className='h-3 w-3' />;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='sort'
          className={`flex items-center gap-2 ${className} h-12 w-24 justify-start rounded-xl`}
        >
          <DirectionIcon />
          <span>{sortLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32'>
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
export function SortButton() {
  const [currentSort, setCurrentSort] = useState('date');
  const [currentDirection, setCurrentDirection] =
    useState<SortDirection>('desc');

  const sortOptions: SortOption[] = [
    { value: 'date', label: 'Date' },
    { value: 'priority', label: 'Priority' },
  ];

  const handleSortChange = (sort: string, direction: SortDirection) => {
    setCurrentSort(sort);
    setCurrentDirection(direction);
    console.log(`Sorting by ${sort} in ${direction} order`);
  };

  return (
    <div className=''>
      <SortButton1
        options={sortOptions}
        currentSort={currentSort}
        currentDirection={currentDirection}
        onSortChange={handleSortChange}
      />
    </div>
  );
}
