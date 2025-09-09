'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';

import { fetchTodos, fetchTodosScroll } from '@/lib/api';
import { RootState } from '@/store/store';

export function useTodosUpcoming() {
  const filterState = useSelector((state: RootState) => state.filter);

  // Add timestamp to force refetch when component mounts
  const [mountTime] = React.useState(() => Date.now());

  // Get upcoming todos: not completed and date > today
  const getApiParams = () => {
    const params: any = {
      completed: false, // Only fetch uncompleted todos
      limit: 1000, // Fetch all upcoming todos (set high limit)
    };

    // Set date filter for upcoming (tomorrow onwards)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    params.dateGte = tomorrow.toISOString();

    // Apply sorting from current filter state
    params.sort = filterState.sort;
    params.order = filterState.order;

    return params;
  };

  // For paginated view
  const todosQuery = useQuery({
    queryKey: [
      'todos-upcoming',
      filterState.sort,
      filterState.order,
      filterState.viewMode,
      mountTime,
    ],
    queryFn: () => fetchTodos(getApiParams()),
    enabled: filterState.viewMode === 'page',
    staleTime: 0,
    refetchOnMount: 'always',
  });

  // For infinite scroll view
  const todosScrollQuery = useQuery({
    queryKey: [
      'todos-upcoming-scroll',
      filterState.sort,
      filterState.order,
      filterState.viewMode,
      mountTime,
    ],
    queryFn: () => fetchTodosScroll(getApiParams()),
    enabled: filterState.viewMode === 'scroll',
    staleTime: 0,
    refetchOnMount: 'always',
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
