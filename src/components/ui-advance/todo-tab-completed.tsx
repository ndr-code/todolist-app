import { CheckCircle2 } from 'lucide-react';
import React from 'react';

import { completedTodos } from '@/constants/mockTodos';

import { TodoCard } from './todo-card';

function TodoTabCompleted() {
  return (
    <div>
      <div className='mb-4 flex items-center gap-2'>
        <CheckCircle2 className='text-foreground h-6 w-6' />
        <h2 className='text-foreground display-xs-bold'>Completed</h2>
        <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
          {completedTodos.length} {completedTodos.length > 1 ? 'items' : 'item'}
        </span>
      </div>

      <div className='mt-4 space-y-3'>
        {completedTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} showCheckbox={true} />
        ))}
      </div>
    </div>
  );
}

export default TodoTabCompleted;
