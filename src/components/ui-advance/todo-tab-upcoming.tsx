'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React from 'react';

import { useTodosUpcoming } from '@/hooks/useTodosUpcoming';

import { TodoCard } from './todo-card';
import { Button } from '../ui-basic/button';

function TodoTabUpcoming() {
  const { todos, isLoading, error, viewMode } = useTodosUpcoming();
  const [currentPage, setCurrentPage] = React.useState(1);

  // Memoize todos data to prevent re-renders
  const allTodos = React.useMemo(() => {
    return todos.data?.todos || [];
  }, [todos.data?.todos]);

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
        <div className='flex w-full items-center justify-between gap-2'>
          <div>
            <div className='flex items-center gap-2'>
              <h2 className='text-foreground display-xs-bold'>Upcoming</h2>
              <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
                {allTodos.length} {allTodos.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className='mt-1 flex items-center gap-2'>
              <span className='text-muted-foreground text-sm'>Next 7 days</span>
            </div>
          </div>
          <div className='border-border bg-card flex h-9 items-center justify-around gap-1 rounded-md border px-1'>
            <button className='hover:bg-muted cursor-pointer rounded'>
              <ChevronLeft className='h-6 w-6 p-1 text-neutral-900' />
            </button>
            <span className='text-muted-foreground hover:bg-muted cursor-pointer rounded px-2 text-sm'>
              Today
            </span>
            <button className='hover:bg-muted cursor-pointer rounded'>
              <ChevronRight className='h-6 w-6 p-1 text-neutral-900' />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className='mt-4 mb-4 flex gap-2'>
        {[
          'Thu 7',
          'Fri 8',
          'Sat 9',
          'Sun 10',
          'Mon 11',
          'Tue 12',
          'Wed 13',
          'Thu 14',
        ].map((day, index) => (
          <div
            key={day}
            className={`flex-1 rounded-lg p-2 text-center text-sm ${
              index === 3
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className='space-y-3'>
        {paginatedTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No upcoming todos</p>
          </div>
        ) : (
          paginatedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>

      <div className='mt-8 flex w-full items-center justify-center'>
        <Button className='h-12 w-75 gap-2'>
          <Plus className='h-4 w-4' />
          Add Task
        </Button>
      </div>
    </div>
  );
}

export default TodoTabUpcoming;
