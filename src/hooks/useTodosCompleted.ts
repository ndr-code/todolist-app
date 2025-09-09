'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';

import { fetchTodos, fetchTodosScroll } from '@/lib/api';
import { RootState } from '@/store/store';

export function useTodosCompleted() {
  const filterState = useSelector((state: RootState) => state.filter);

  // Add timestamp to force refetch when component mounts
  const [mountTime] = React.useState(() => Date.now());

  // Always fetch completed todos regardless of current filter state
  const getApiParams = () => {
    const params: any = {
      completed: true, // Always fetch completed todos
      limit: 1000, // Fetch all completed todos (set high limit)
    };

    // Apply sorting from current filter state
    params.sort = filterState.sort;
    params.order = filterState.order;

    console.log('[useTodosCompleted] API params:', params);
    return params;
  };

  // For paginated view
  const todosQuery = useQuery({
    queryKey: [
      'todos-completed',
      filterState.sort,
      filterState.order,
      filterState.viewMode,
      mountTime, // Force fresh query on component mount
    ],
    queryFn: () => fetchTodos(getApiParams()),
    enabled: filterState.viewMode === 'page',
    staleTime: 0, // Always consider data stale to force refetch
    gcTime: 0, // Don't cache the data
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  // For infinite scroll view
  const todosScrollQuery = useQuery({
    queryKey: [
      'todos-completed-scroll',
      filterState.sort,
      filterState.order,
      filterState.viewMode,
      mountTime, // Force fresh query on component mount
    ],
    queryFn: () => fetchTodosScroll(getApiParams()),
    enabled: filterState.viewMode === 'scroll',
    staleTime: 0, // Always consider data stale to force refetch
    gcTime: 0, // Don't cache the data
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  return {
    todos: filterState.viewMode === 'page' ? todosQuery : todosScrollQuery,
    isLoading:
      filterState.viewMode === 'page'
        ? todosQuery.isLoading
        : todosScrollQuery.isLoading,
    error:
      filterState.viewMode === 'page'
        ? todosQuery.error
        : todosScrollQuery.error,
    refetch:
      filterState.viewMode === 'page'
        ? todosQuery.refetch
        : todosScrollQuery.refetch,
    viewMode: filterState.viewMode,
  };
}
