import { CheckCircle2, MoreHorizontal } from 'lucide-react';

import { TodoItem } from '@/types/todoItem';

import { Button } from '../ui-basic/button';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    case 'Medium':
      return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    case 'Low':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    default:
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  }
};

export const TodoCard = ({
  todo,
  showCheckbox = false,
}: {
  todo: TodoItem;
  showCheckbox?: boolean;
}) => (
  <div className='bg-card border-border hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-4 transition-colors'>
    {showCheckbox && (
      <div className='border-primary bg-primary flex h-5 w-5 items-center justify-center rounded border-2'>
        <CheckCircle2 className='text-primary-foreground h-3 w-3' />
      </div>
    )}
    {!showCheckbox && (
      <div className='border-muted-foreground bg-background h-5 w-5 rounded border-2'></div>
    )}
    <div className='flex-1'>
      <h3
        className={`font-medium ${showCheckbox ? 'text-muted-foreground line-through' : 'text-foreground'}`}
      >
        {todo.title}
      </h3>
      <div className='mt-1 flex items-center gap-2'>
        <span className='text-muted-foreground text-sm'>{todo.date}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(todo.priority)}`}
        >
          {todo.priority}
        </span>
      </div>
    </div>
    <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
      <MoreHorizontal className='h-4 w-4' />
    </Button>
  </div>
);
