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
    onSuccess: (updatedTodo) => {
      // Update cache for all todos queries with different filter states
      queryClient.setQueriesData({ queryKey: ['todos'] }, (oldData: any) => {
        if (!oldData?.todos) return oldData;

        return {
          ...oldData,
          todos: oldData.todos.map((todo: Todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ),
        };
      });

      // Update cache for scroll queries
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

      // Invalidate all todo queries to refetch with updated data
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-scroll'] });

      // Show success message
      toast.success(
        updatedTodo.completed
          ? 'Todo marked as completed!'
          : 'Todo marked as active!'
      );
    },
    onError: (error) => {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo. Please try again.');
    },
  });
}
