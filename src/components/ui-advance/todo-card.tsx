'use client';

import { MoreHorizontal } from 'lucide-react';

import { useUpdateTodo } from '@/lib/hooks/useUpdateTodo';
import { TodoItem } from '@/types/todoItem';

import { Button } from '../ui-basic/button';
import { Card } from '../ui-basic/card';
import { Checkbox } from '../ui-basic/checkbox';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-accent-red text-white';
    case 'MEDIUM':
      return 'bg-accent-yellow text-black';
    case 'LOW':
      return 'bg-accent-green text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'High';
    case 'MEDIUM':
      return 'Medium';
    case 'LOW':
      return 'Low';
    default:
      return priority;
  }
};

export const TodoCard = ({ todo }: { todo: TodoItem }) => {
  const updateTodoMutation = useUpdateTodo();

  const handleCheckboxChange = (checked: boolean) => {
    updateTodoMutation.mutate({
      id: todo.id,
      updates: { completed: checked },
    });
  };

  return (
    <Card className='!bg-card !border-border hover:!bg-muted/30 !flex !flex-row !items-center !gap-3 !rounded-2xl !border !p-4 !transition-all !duration-300 !ease-in-out hover:!shadow-md'>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleCheckboxChange}
        disabled={updateTodoMutation.isPending}
        className='mr-2 h-6 w-6 cursor-pointer'
      />
      <div className='flex-1'>
        <h3
          className={`font-medium ${todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
        >
          {todo.title}
        </h3>
        <div className='mt-1 flex items-center gap-2'>
          <span className='text-muted-foreground text-sm'>
            {new Date(todo.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span
            className={`mx-4 flex h-6 items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium ${getPriorityColor(todo.priority)}`}
          >
            {getPriorityLabel(todo.priority)}
          </span>
        </div>
      </div>
      <Button variant='ghost' size='sm' className='h-8 w-8 scale-150 p-0'>
        <MoreHorizontal className='h-12 w-12' />
      </Button>
    </Card>
  );
};
