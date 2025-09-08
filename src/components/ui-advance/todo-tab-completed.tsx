'use client';

import { CheckCircle2 } from 'lucide-react';
import React from 'react';

import { useTodos } from '@/lib/hooks/useTodos';

import { TodoCard } from './todo-card';

function TodoTabCompleted() {
  const { todos, isLoading, error } = useTodos();

  // Filter for completed todos
  const completedTodos = React.useMemo(() => {
    if (!todos.data?.todos) return [];

    return todos.data.todos.filter((todo) => todo.completed);
  }, [todos.data?.todos]);

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
          {completedTodos.length}{' '}
          {completedTodos.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className='mt-4 space-y-3'>
        {completedTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No completed todos</p>
          </div>
        ) : (
          completedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}

export default TodoTabCompleted;
