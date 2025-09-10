import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTodo } from '@/lib/api';

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      // Show success toast
      toast.success('Task deleted successfully!');

      // Invalidate and refetch todos queries
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-today'] });
      queryClient.invalidateQueries({ queryKey: ['todos-upcoming'] });
      queryClient.invalidateQueries({ queryKey: ['todos-completed'] });
      queryClient.invalidateQueries({ queryKey: ['todos-search'] });

      console.log('Todo deleted:', data);
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
      toast.error('Failed to delete task. Please try again.');
    },
  });
}
