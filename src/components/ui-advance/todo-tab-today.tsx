'use client';

import React from 'react';

import { useTodosToday } from '@/hooks/useTodosToday';

import { AddTodoButton } from './add-todo-button';
import { TodoCard } from './todo-card';
import TodosPagination from './todos-pagination';

function TodoTabToday() {
  const { todos, isLoading, error, viewMode } = useTodosToday();
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
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-foreground display-xs-bold'>Today</h2>
            <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
              {allTodos.length} {allTodos.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className='text-muted-foreground text-sm'>
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
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

        {paginatedTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No todos for today</p>
          </div>
        ) : (
          paginatedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>

      {/* Pagination Controls - Bottom */}
      {viewMode === 'page' && (
        <TodosPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          className='mt-4 mb-4'
        />
      )}

      <div className='mt-8 flex w-full items-center justify-center'>
        <AddTodoButton
          defaultDate={new Date()}
          size='default'
          className='h-12 w-75'
        />
      </div>
    </div>
  );
}

export default TodoTabToday;
