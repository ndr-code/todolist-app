'use client';

import { Plus } from 'lucide-react';
import React from 'react';

import { useTodos } from '@/lib/hooks/useTodos';

import { TodoCard } from './todo-card';
import { Button } from '../ui-basic/button';

function TodoTabToday() {
  const { todos, isLoading, error } = useTodos();

  // Filter for today's todos (not completed)
  const todayTodos =
    todos.data?.todos?.filter((todo) => {
      const today = new Date();
      const todoDate = new Date(todo.date);
      return (
        !todo.completed && todoDate.toDateString() === today.toDateString()
      );
    }) || [];

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
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-foreground display-xs-bold'>Today</h2>
            <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
              {todayTodos.length} {todayTodos.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className='text-muted-foreground text-sm'>
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className='mt-4 space-y-3'>
        {todayTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No todos for today</p>
          </div>
        ) : (
          todayTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>
      <div className='mt-8 flex w-full items-center justify-center'>
        <Button className='h-12 w-75 gap-2'>
          <Plus className='h-4 w-4' />
          Add Task
        </Button>
      </div>
    </div>
  );
}

export default TodoTabToday;
