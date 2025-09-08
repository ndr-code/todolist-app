'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

import { fetchTodos, fetchTodosScroll } from '@/lib/api';
import { RootState } from '@/store/store';

import { TodoCard } from './todo-card';
import { Button } from '../ui-basic/button';

function SearchResult() {
  const filterState = useSelector((state: RootState) => state.filter);
  const { searchText, viewMode } = filterState;
  const [currentPage, setCurrentPage] = React.useState(1);

  // Transform Redux state to API params for search
  const getSearchApiParams = React.useCallback(() => {
    const params: any = {};

    // Always include search text for SearchResult
    if (searchText) {
      params.title = searchText;
    }

    // Include other filters
    if (filterState.completed !== 'all') {
      params.completed = filterState.completed === 'completed';
    }

    if (filterState.priority !== 'all') {
      params.priority = filterState.priority;
    }

    if (filterState.dateGte) {
      params.dateGte = filterState.dateGte;
    }
    if (filterState.dateLte) {
      params.dateLte = filterState.dateLte;
    }

    // Sort
    params.sort = filterState.sort;
    params.order = filterState.order;

    return params;
  }, [searchText, filterState]);

  // Dedicated search queries
  const searchQuery = useQuery({
    queryKey: ['search-todos', filterState],
    queryFn: () => fetchTodos(getSearchApiParams()),
    enabled: !!searchText && viewMode === 'page',
  });

  const searchScrollQuery = useQuery({
    queryKey: ['search-todos-scroll', filterState],
    queryFn: () => fetchTodosScroll(getSearchApiParams()),
    enabled: !!searchText && viewMode === 'scroll',
  });

  const todos = viewMode === 'page' ? searchQuery : searchScrollQuery;
  const isLoading =
    viewMode === 'page' ? searchQuery.isLoading : searchScrollQuery.isLoading;
  const error =
    viewMode === 'page' ? searchQuery.error : searchScrollQuery.error;

  // Memoize todos data to prevent re-renders
  const allTodos = React.useMemo(() => {
    const todosData = todos.data?.todos || [];
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

  // Reset page when switching view modes or search text changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, searchText]);

  // Don't render if no search text
  if (!searchText || !searchText.trim()) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-muted-foreground'>Searching...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-destructive'>Error loading search results</div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-foreground display-xs-bold'>Search Results</h2>
            <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
              {allTodos.length} {allTodos.length === 1 ? 'result' : 'results'}
            </span>
          </div>
          <p className='text-muted-foreground text-sm'>
            Found for &ldquo;{searchText}&rdquo;
          </p>
        </div>
      </div>

      <div className='mt-4 space-y-3'>
        {/* Pagination Controls - Top */}
        {viewMode === 'page' && totalPages > 1 && (
          <div className='mb-4 flex items-center justify-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className='flex items-center gap-1'
            >
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Button>

            <span className='text-muted-foreground px-3 text-sm'>
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant='outline'
              size='sm'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='flex items-center gap-1'
            >
              Next
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}

        {paginatedTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>
              No todos found for &ldquo;{searchText}&rdquo;
            </p>
          </div>
        ) : (
          paginatedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>

      {/* Pagination Controls - Bottom */}
      {viewMode === 'page' && totalPages > 1 && (
        <div className='mt-6 flex items-center justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='flex items-center gap-1'
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>

          <span className='text-muted-foreground px-3 text-sm'>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='flex items-center gap-1'
          >
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
