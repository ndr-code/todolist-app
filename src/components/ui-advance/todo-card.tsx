'use client';

import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import * as React from 'react';

import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { TodoItem } from '@/types/todoItem';

import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { Button } from '../ui-basic/button';
import { Card } from '../ui-basic/card';
import { Checkbox } from '../ui-basic/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui-basic/dropdown-menu';

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
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCheckboxChange = (checked: boolean) => {
    updateTodoMutation.mutate({
      id: todo.id,
      updates: { completed: checked },
    });
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit todo:', todo.id);
  };

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    deleteTodoMutation.mutate(todo.id);
    setShowDeleteAlert(false);
  };

  return (
    <>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='h-8 w-8 scale-150 p-0'
              disabled={deleteTodoMutation.isPending}
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40'>
            <DropdownMenuItem
              onClick={handleEdit}
              className='cursor-pointer'
              disabled={deleteTodoMutation.isPending}
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className='text-destructive focus:text-destructive cursor-pointer'
              disabled={deleteTodoMutation.isPending}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              {deleteTodoMutation.isPending ? 'Deleting...' : 'Delete'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      <DeleteConfirmDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={confirmDelete}
        title={todo.title}
        isLoading={deleteTodoMutation.isPending}
      />
    </>
  );
};
