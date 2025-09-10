'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateTodo } from '@/lib/api';
import { Todo } from '@/types/todos';

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
      updateTodo(id, updates),

    // Optimistic update - runs immediately when mutation is called
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      await queryClient.cancelQueries({ queryKey: ['todos-scroll'] });
      await queryClient.cancelQueries({ queryKey: ['todos-today'] });
      await queryClient.cancelQueries({ queryKey: ['todos-today-infinite'] });

      // Snapshot the previous values
      const previousTodosQueries = queryClient.getQueriesData({
        queryKey: ['todos'],
      });
      const previousScrollQueries = queryClient.getQueriesData({
        queryKey: ['todos-scroll'],
      });
      const previousTodayQueries = queryClient.getQueriesData({
        queryKey: ['todos-today'],
      });
      const previousTodayInfiniteQueries = queryClient.getQueriesData({
        queryKey: ['todos-today-infinite'],
      });

      // Optimistically update todos queries
      queryClient.setQueriesData({ queryKey: ['todos'] }, (oldData: any) => {
        if (!oldData?.todos) return oldData;
        return {
          ...oldData,
          todos: oldData.todos.map((todo: Todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        };
      });

      // Optimistically update todos-scroll queries
      queryClient.setQueriesData(
        { queryKey: ['todos-scroll'] },
        (oldData: any) => {
          if (!oldData?.todos) return oldData;
          return {
            ...oldData,
            todos: oldData.todos.map((todo: Todo) =>
              todo.id === id ? { ...todo, ...updates } : todo
            ),
          };
        }
      );

      // Optimistically update todos-today queries
      queryClient.setQueriesData(
        { queryKey: ['todos-today'] },
        (oldData: any) => {
          if (!oldData?.todos) return oldData;
          return {
            ...oldData,
            todos: oldData.todos.map((todo: Todo) =>
              todo.id === id ? { ...todo, ...updates } : todo
            ),
          };
        }
      );

      // Optimistically update todos-today-infinite queries (for infinite scroll)
      queryClient.setQueriesData(
        { queryKey: ['todos-today-infinite'] },
        (oldData: any) => {
          if (!oldData?.pages) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              todos: page.todos.map((todo: Todo) =>
                todo.id === id ? { ...todo, ...updates } : todo
              ),
            })),
          };
        }
      );

      // Return a context object with the snapshotted values
      return {
        previousTodosQueries,
        previousScrollQueries,
        previousTodayQueries,
        previousTodayInfiniteQueries,
      };
    },

    onSuccess: (updatedTodo) => {
      // Update cache with the actual server response
      queryClient.setQueriesData({ queryKey: ['todos'] }, (oldData: any) => {
        if (!oldData?.todos) return oldData;
        return {
          ...oldData,
          todos: oldData.todos.map((todo: Todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ),
        };
      });

      queryClient.setQueriesData(
        { queryKey: ['todos-scroll'] },
        (oldData: any) => {
          if (!oldData?.todos) return oldData;
          return {
            ...oldData,
            todos: oldData.todos.map((todo: Todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            ),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: ['todos-today'] },
        (oldData: any) => {
          if (!oldData?.todos) return oldData;
          return {
            ...oldData,
            todos: oldData.todos.map((todo: Todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            ),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: ['todos-today-infinite'] },
        (oldData: any) => {
          if (!oldData?.pages) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              todos: page.todos.map((todo: Todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
              ),
            })),
          };
        }
      );

      // Show success message
      toast.success(
        updatedTodo.completed
          ? 'Todo marked as completed!'
          : 'Todo marked as active!'
      );
    },

    onError: (error, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodosQueries) {
        context.previousTodosQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
      if (context?.previousScrollQueries) {
        context.previousScrollQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
      if (context?.previousTodayQueries) {
        context.previousTodayQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
      if (context?.previousTodayInfiniteQueries) {
        context.previousTodayInfiniteQueries.forEach(
          ([queryKey, queryData]) => {
            queryClient.setQueryData(queryKey, queryData);
          }
        );
      }

      console.error('Error updating todo:', error);
      toast.error('Failed to update todo. Please try again.');
    },
  });
}
