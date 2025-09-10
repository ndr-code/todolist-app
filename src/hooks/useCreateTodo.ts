import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTodo } from '@/lib/api';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      // Show success toast
      toast.success('Task created successfully!');

      // Invalidate and refetch todos queries
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-today'] });
      queryClient.invalidateQueries({ queryKey: ['todos-upcoming'] });
      queryClient.invalidateQueries({ queryKey: ['todos-completed'] });
      queryClient.invalidateQueries({ queryKey: ['todos-search'] });

      console.log('Todo created:', data);
    },
    onError: (error) => {
      console.error('Failed to create todo:', error);
      toast.error('Failed to create task. Please try again.');
    },
  });
}
