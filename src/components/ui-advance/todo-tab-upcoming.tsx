'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { useTodosUpcoming } from '@/hooks/useTodosUpcoming';

import { AddTodoButton } from './add-todo-button';
import { TodoCard } from './todo-card';
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
      <div className='flex items-center justify-center py-8'>
        <div className='text-muted-foreground'>Loading...</div>
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
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-foreground display-xs-bold'>Upcoming</h2>
            <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3 py-1'>
              {allTodos.length} Item{allTodos.length !== 1 ? 's' : ''}
            </span>
            {selectedDate && (
              <button
                onClick={clearDateSelection}
                className='rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-200'
              >
                All Days
              </button>
            )}
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <span className='text-muted-foreground text-sm'>
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    weekday: 'long',
                  })
                : currentMonthYear}
            </span>
            <span className='text-muted-foreground text-sm'>▼</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='border-border bg-card flex h-9 items-center justify-around gap-1 rounded-md border px-1'>
            <button
              className='hover:bg-muted cursor-pointer rounded'
              onClick={handlePrevWeek}
            >
              <ChevronLeft className='h-6 w-6 p-1 text-neutral-900' />
            </button>
            <button
              className='text-muted-foreground hover:bg-muted cursor-pointer rounded px-2 text-sm'
              onClick={goToToday}
            >
              This Week
            </button>
            <button
              className='hover:bg-muted cursor-pointer rounded'
              onClick={handleNextWeek}
            >
              <ChevronRight className='h-6 w-6 p-1 text-neutral-900' />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className='mt-4 mb-4 flex gap-2'>
        {weekDays.map((day) => (
          <div
            key={day.key}
            onClick={() => handleDateSelect(day.date)}
            className={`relative flex-1 cursor-pointer rounded-lg p-2 text-center text-sm transition-colors ${
              day.isSelected
                ? 'bg-blue-500 text-white'
                : day.isToday
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {day.label}
            {day.hasTodos && !day.isSelected && !day.isToday && (
              <div className='absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500'></div>
            )}
          </div>
        ))}
      </div>

      <div className='mt-4 space-y-3'>
        {/* Pagination Controls - Top */}
        {viewMode === 'page' && (
          <TodosPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            className='mb-4'
          />
        )}
      </div>

      <div className='space-y-3'>
        {paginatedTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>
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

      <div className='mt-4 space-y-3'>
        {/* Pagination Controls - Top */}
        {viewMode === 'page' && (
          <TodosPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            className='mb-4'
          />
        )}
      </div>

      <div className='mt-8 flex w-full items-center justify-center'>
        <AddTodoButton
          defaultDate={
            selectedDate || new Date(Date.now() + 24 * 60 * 60 * 1000)
          }
          size='default'
          className='h-12 w-75'
        />
      </div>
    </div>
  );
}

export default TodoTabUpcoming;
