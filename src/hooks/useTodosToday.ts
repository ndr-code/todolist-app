'use client';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { fetchTodos, fetchTodosScroll } from '@/lib/api';
import { RootState } from '@/store/store';

export function useTodosToday() {
  const filterState = useSelector((state: RootState) => state.filter);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Transform Redux state to API params with today filter
  const getApiParams = () => {
    const params: any = {};

    // Get today's date range in full ISO format for proper API filtering
    const todayStart = `${today}T00:00:00.000Z`; // Start of day
    const todayEnd = `${today}T23:59:59.999Z`; // End of day

    // Filter for today's date range
    params.dateGte = todayStart;
    params.dateLte = todayEnd;

    // Completed filter
    if (filterState.completed !== 'all') {
      params.completed = filterState.completed === 'completed';
    }

    // Priority filter
    if (filterState.priority !== 'all') {
      params.priority = filterState.priority;
    }

    // Include search text if present
    if (filterState.searchText) {
      params.title = filterState.searchText;
    }

    // Sort
    params.sort = filterState.sort;
    params.order = filterState.order;

    // Set higher limit for today view to show more todos
    params.limit = 50;

    return params;
  };

  // For paginated view
  const todosQuery = useQuery({
    queryKey: [
      'todos-today',
      filterState.viewMode,
      filterState.completed,
      filterState.priority,
      filterState.searchText,
      filterState.sort,
      filterState.order,
      today, // Add today to key for cache invalidation
    ],
    queryFn: () => {
      console.log('[useTodosToday] Fetching paginated todos for:', today);
      return fetchTodos(getApiParams());
    },
    enabled: filterState.viewMode === 'page',
  });

  // For infinite scroll view
  const todosScrollQuery = useQuery({
    queryKey: [
      'todos-today-scroll',
      filterState.viewMode,
      filterState.completed,
      filterState.priority,
      filterState.searchText,
      filterState.sort,
      filterState.order,
      today, // Add today to key for cache invalidation
    ],
    queryFn: () => {
      console.log('[useTodosToday] Fetching scroll todos for:', today);
      return fetchTodosScroll(getApiParams());
    },
    enabled: filterState.viewMode === 'scroll',
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
