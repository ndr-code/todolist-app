'use client';

import { CheckCircle2 } from 'lucide-react';
import React from 'react';

import { useTodosCompleted } from '@/hooks/useTodosCompleted';

import { TodoCard } from './todo-card';
import TodosPagination from './todos-pagination';

interface TodoTabCompletedProps {
  isActive?: boolean;
}

function TodoTabCompleted({ isActive = false }: TodoTabCompletedProps = {}) {
  const { todos, isLoading, error, viewMode, refetch } = useTodosCompleted();
  const [currentPage, setCurrentPage] = React.useState(1);

  // Memoize todos data to prevent re-renders
  const allTodos = React.useMemo(() => {
    const todosData = todos.data?.todos || [];
    console.log('[TodoTabCompleted] Received todos count:', todosData.length);
    console.log('[TodoTabCompleted] Todos data:', todosData);
    return todosData;
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

  // Refetch data when tab becomes active
  React.useEffect(() => {
    if (isActive) {
      refetch();
    }
  }, [isActive, refetch]);

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
      <div className='mb-4 flex items-center gap-2'>
        <CheckCircle2 className='text-foreground h-6 w-6' />
        <h2 className='text-foreground display-xs-bold'>Completed</h2>
        <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
          {allTodos.length} {allTodos.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Pagination controls - top */}
      {viewMode === 'page' && (
        <TodosPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          className='mb-4'
        />
      )}

      <div className='mt-4 space-y-3'>
        {paginatedTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No completed todos</p>
          </div>
        ) : (
          paginatedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>

      {/* Pagination controls - bottom */}
      {viewMode === 'page' && (
        <TodosPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          className='mt-4 mb-4'
        />
      )}
    </div>
  );
}

export default TodoTabCompleted;
