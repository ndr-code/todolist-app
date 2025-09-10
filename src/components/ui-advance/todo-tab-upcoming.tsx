'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { useTodosUpcoming } from '@/hooks/useTodosUpcoming';

import { AddTodoButton } from './add-todo-button';
import { TodoCard, TodoCardSkeleton } from './todo-card';
import TodosPagination from './todos-pagination';

function TodoTabUpcoming() {
  const { todos, isLoading, error, viewMode } = useTodosUpcoming();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = React.useState(() => {
    // Get current date and calculate week start (Sunday)
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);
    return weekStart;
  });

  // Generate week days from current week start
  const weekDays = React.useMemo(() => {
    const days = [];
    const today = new Date();
    const allTodosData = todos.data?.todos || [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[date.getDay()];
      const dayNumber = date.getDate();

      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      // Check if this date has todos
      const hasTodos = allTodosData.some((todo) => {
        try {
          const todoDate = new Date(todo.date);
          return todoDate.toDateString() === date.toDateString();
        } catch {
          return false;
        }
      });

      days.push({
        key: `${dayName}-${dayNumber}`,
        label: `${dayName} ${dayNumber}`,
        dayName: dayName,
        dayNumber: dayNumber,
        date: date,
        isToday: isToday,
        isSelected: isSelected || false,
        hasTodos: hasTodos,
      });
    }

    return days;
  }, [currentWeekStart, selectedDate, todos.data?.todos]);

  // Memoize todos data to prevent re-renders and filter by selected date
  const allTodos = React.useMemo(() => {
    const todosData = todos.data?.todos || [];

    // If no date is selected, show all upcoming todos
    if (!selectedDate) {
      return todosData;
    }

    // Filter todos for the selected date
    const selectedDateStr = selectedDate.toDateString();
    return todosData.filter((todo) => {
      try {
        const todoDate = new Date(todo.date);
        return todoDate.toDateString() === selectedDateStr;
      } catch (err) {
        console.warn('Error parsing todo date:', todo.date, err);
        return false;
      }
    });
  }, [todos.data?.todos, selectedDate]);

  // For pagination mode, handle client-side pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allTodos.length / itemsPerPage);

  const paginatedTodos = React.useMemo(() => {
    if (viewMode === 'scroll') {
      // For infinite scroll, show all todos
      return allTodos;
    } else {
      // For pagination, show current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      return allTodos.slice(startIndex, startIndex + itemsPerPage);
    }
  }, [allTodos, currentPage, viewMode]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // Navigation functions for week
  const handlePrevWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToToday = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);
    setCurrentWeekStart(weekStart);
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentPage(1); // Reset to first page when date changes
  };

  // Clear date selection to show all upcoming todos
  const clearDateSelection = () => {
    setSelectedDate(null);
    setCurrentPage(1);
  };

  // Format current month and year
  const currentMonthYear = React.useMemo(() => {
    const firstDayOfWeek = weekDays[0]?.date;
    if (!firstDayOfWeek) return '';

    return firstDayOfWeek.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [weekDays]);

  // Reset page when switching view modes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [viewMode]);

  if (isLoading) {
    return (
      <div>
        {/* Header skeleton */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex-1'>
            <div className='flex flex-row gap-2 sm:items-center sm:gap-2'>
              <h2 className='text-foreground display-xs-bold'>Upcoming</h2>
              <div className='bg-muted h-6 w-16 animate-pulse rounded-full'></div>
            </div>
            <div className='bg-muted mt-1 h-4 w-32 animate-pulse rounded'></div>
          </div>
          <div className='flex items-center justify-center sm:justify-end'>
            <div className='bg-muted h-8 w-32 animate-pulse rounded-md sm:h-9'></div>
          </div>
        </div>

        {/* Calendar skeleton */}
        <div className='mt-3 mb-3 flex gap-1 sm:mt-4 sm:mb-4 sm:gap-2'>
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className='relative flex-1 rounded-lg p-1.5 sm:p-2'
            >
              <div className='bg-muted h-8 w-full animate-pulse rounded sm:h-10'></div>
            </div>
          ))}
        </div>

        {/* Cards skeleton */}
        <div className='space-y-2 sm:space-y-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <TodoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-destructive'>Error loading todos</div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex-1'>
          <div className='flex flex-row gap-2 sm:items-center sm:gap-2'>
            <h2 className='text-foreground display-xs-bold'>Upcoming</h2>
            <div className='flex items-center gap-2'>
              <span className='text-muted-foreground text-xs-semibold rounded-full bg-neutral-400 px-2 py-1 sm:px-3'>
                {allTodos.length} Item{allTodos.length !== 1 ? 's' : ''}
              </span>
              {selectedDate && (
                <button
                  onClick={clearDateSelection}
                  className='cursor-pointer rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-200'
                >
                  All Days
                </button>
              )}
            </div>
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <span className='text-muted-foreground text-xs sm:text-sm'>
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    weekday: 'long',
                  })
                : currentMonthYear}
            </span>
            <span className='text-muted-foreground text-xs sm:text-sm'>▼</span>
          </div>
        </div>
        <div className='flex items-center justify-center sm:justify-end'>
          <div className='border-border bg-card flex h-8 w-full flex-row items-center justify-around gap-1 rounded-md border px-1 sm:h-9'>
            <button
              className='hover:bg-muted flex w-full cursor-pointer justify-center rounded p-1'
              onClick={handlePrevWeek}
            >
              <ChevronLeft className='h-4 w-4 text-neutral-900 sm:h-5 sm:w-5' />
            </button>
            <button
              className='text-muted-foreground hover:bg-muted w-full cursor-pointer rounded px-1.5 text-xs sm:min-w-20 sm:px-2 sm:text-sm'
              onClick={goToToday}
            >
              This Week
            </button>
            <button
              className='hover:bg-muted flex w-full cursor-pointer justify-center rounded p-1'
              onClick={handleNextWeek}
            >
              <ChevronRight className='h-4 w-4 text-neutral-900 sm:h-5 sm:w-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className='mt-3 mb-3 flex gap-1 sm:mt-4 sm:mb-4 sm:gap-2'>
        {weekDays.map((day) => (
          <div
            key={day.key}
            onClick={() => handleDateSelect(day.date)}
            className={`relative flex-1 cursor-pointer rounded-lg p-1.5 text-center text-xs transition-colors sm:p-2 sm:text-sm ${
              day.isSelected
                ? 'bg-blue-500 text-white'
                : day.isToday
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {/* Mobile: Vertical layout */}
            <div className='flex flex-col items-center justify-center gap-0.5 sm:hidden'>
              <div className='text-xs leading-none font-medium'>
                {day.dayName}
              </div>
              <div className='text-xs leading-none font-bold'>
                {day.dayNumber}
              </div>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className='hidden truncate sm:block'>{day.label}</div>

            {day.hasTodos && !day.isSelected && !day.isToday && (
              <div className='absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-blue-500 sm:top-1 sm:right-1 sm:h-2 sm:w-2'></div>
            )}
          </div>
        ))}
      </div>

      <div className='mt-3 space-y-3 sm:mt-4'>
        {/* Pagination Controls - Top */}
        {viewMode === 'page' && (
          <TodosPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            className='mb-3 sm:mb-4'
          />
        )}
      </div>

      <div className='space-y-2 sm:space-y-3'>
        {paginatedTodos.length === 0 ? (
          <div className='py-6 text-center sm:py-8'>
            <p className='text-muted-foreground text-sm sm:text-base'>
              {selectedDate
                ? `No todos for ${selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}`
                : 'No upcoming todos'}
            </p>
            {selectedDate && (
              <button
                onClick={clearDateSelection}
                className='mt-2 text-sm text-blue-600 underline hover:text-blue-800'
              >
                View all upcoming todos
              </button>
            )}
          </div>
        ) : (
          paginatedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>

      <div className='mt-3 space-y-3 sm:mt-4'>
        {/* Pagination Controls - Bottom */}
        {viewMode === 'page' && (
          <TodosPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            className='mb-3 sm:mb-4'
          />
        )}
      </div>

      <div className='mt-6 flex w-full items-center justify-center sm:mt-8'>
        <AddTodoButton
          defaultDate={
            selectedDate || new Date(Date.now() + 24 * 60 * 60 * 1000)
          }
          size='default'
          className='h-10 w-full max-w-xs sm:h-12 sm:w-75'
        />
      </div>
    </div>
  );
}

export default TodoTabUpcoming;
