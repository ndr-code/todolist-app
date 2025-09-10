'use client';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { fetchTodos, fetchTodosScroll } from '@/lib/api';
import { RootState } from '@/store/store';

export function useTodos() {
  const filterState = useSelector((state: RootState) => state.filter);

  // Transform Redux state to API params
  const getApiParams = () => {
    const params: any = {};

    // Completed filter
    if (filterState.completed !== 'all') {
      params.completed = filterState.completed === 'completed';
    }

    // Priority filter
    if (filterState.priority !== 'all') {
      params.priority = filterState.priority;
    }

    // Date filters
    if (filterState.dateGte) {
      params.dateGte = filterState.dateGte;
    }
    if (filterState.dateLte) {
      params.dateLte = filterState.dateLte;
    }

    // Search text
    if (filterState.searchText) {
      params.title = filterState.searchText;
    }

    // Sort
    params.sort = filterState.sort;
    params.order = filterState.order;

    return params;
  };

  // For paginated view
  const todosQuery = useQuery({
    queryKey: ['todos', filterState],
    queryFn: () => fetchTodos(getApiParams()),
    enabled: filterState.viewMode === 'page',
  });

  // For infinite scroll view
  const todosScrollQuery = useQuery({
    queryKey: ['todos-scroll', filterState],
    queryFn: () => fetchTodosScroll(getApiParams()),
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
  };
}
