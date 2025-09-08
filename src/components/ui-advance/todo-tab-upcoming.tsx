'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React from 'react';

import { useTodos } from '@/hooks/useTodos';

import { TodoCard } from './todo-card';
import { Button } from '../ui-basic/button';

function TodoTabUpcoming() {
  const { todos, isLoading, error } = useTodos();

  // Filter for upcoming todos (not completed and not today)
  const upcomingTodos = React.useMemo(() => {
    if (!todos.data?.todos) return [];

    const today = new Date();
    const todayStr = today.toDateString();

    return todos.data.todos.filter((todo) => {
      // Skip completed todos
      if (todo.completed) return false;

      try {
        let todoDate: Date;

        if (todo.date.includes('T') || todo.date.includes('-')) {
          todoDate = new Date(todo.date);
        } else {
          todoDate = new Date(todo.date);
        }

        if (isNaN(todoDate.getTime())) {
          console.warn('Invalid date format:', todo.date);
          return false;
        }

        // Return todos that are after today
        return todoDate.toDateString() !== todayStr && todoDate > today;
      } catch (err) {
        console.warn('Error parsing date:', todo.date, err);
        return false;
      }
    });
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
      <div className='flex items-center justify-between'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div>
            <div className='flex items-center gap-2'>
              <h2 className='text-foreground display-xs-bold'>Upcoming</h2>
              <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
                {upcomingTodos.length}{' '}
                {upcomingTodos.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className='mt-1 flex items-center gap-2'>
              <span className='text-muted-foreground text-sm'>Next 7 days</span>
            </div>
          </div>
          <div className='border-border bg-card flex h-9 items-center justify-around gap-1 rounded-md border px-1'>
            <button className='hover:bg-muted cursor-pointer rounded'>
              <ChevronLeft className='h-6 w-6 p-1 text-neutral-900' />
            </button>
            <span className='text-muted-foreground hover:bg-muted cursor-pointer rounded px-2 text-sm'>
              Today
            </span>
            <button className='hover:bg-muted cursor-pointer rounded'>
              <ChevronRight className='h-6 w-6 p-1 text-neutral-900' />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className='mt-4 mb-4 flex gap-2'>
        {[
          'Thu 7',
          'Fri 8',
          'Sat 9',
          'Sun 10',
          'Mon 11',
          'Tue 12',
          'Wed 13',
          'Thu 14',
        ].map((day, index) => (
          <div
            key={day}
            className={`flex-1 rounded-lg p-2 text-center text-sm ${
              index === 3
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className='space-y-3'>
        {upcomingTodos.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No upcoming todos</p>
          </div>
        ) : (
          upcomingTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
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

export default TodoTabUpcoming;
