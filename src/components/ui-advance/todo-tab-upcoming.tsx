import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React from 'react';

import { mockTodos, completedTodos } from '@/constants/mockTodos';

import { TodoCard } from './todo-card';
import { Button } from '../ui-basic/button';

function TodoTabUpcoming() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div>
            <div className='flex items-center gap-2'>
              <h2 className='text-foreground display-xs-bold'>Upcoming</h2>
              <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
                {completedTodos.length}{' '}
                {completedTodos.length > 1 ? 'items' : 'item'}
              </span>
            </div>
            <div className='mt-1 flex items-center gap-2'>
              <span className='text-muted-foreground text-sm'>Aug 5, 2025</span>
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
        {mockTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
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
