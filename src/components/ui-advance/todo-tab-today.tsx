import { Plus } from 'lucide-react';
import React from 'react';

import { completedTodos, mockTodos } from '@/constants/mockTodos';

import { TodoCard } from './todo-card';
import { Button } from '../ui-basic/button';

function TodoTabToday() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-foreground display-xs-bold'>Today</h2>
            <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
              {completedTodos.length}{' '}
              {completedTodos.length > 1 ? 'items' : 'item'}
            </span>
          </div>
          <p className='text-muted-foreground text-sm'>Aug 5, 2025</p>
        </div>
      </div>

      <div className='space-y-3 mt-4'>
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

export default TodoTabToday;
