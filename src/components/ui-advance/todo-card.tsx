'use client';

import * as React from 'react';

import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { TodoItem } from '@/types/todoItem';

import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { EditTodosDialog } from './edit-todos-dialog';
import { TodoActionsDropdown } from './todo-actions-dropdown';
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
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCheckboxChange = (checked: boolean) => {
    updateTodoMutation.mutate({
      id: todo.id,
      updates: { completed: checked },
    });
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteTodoMutation.mutate(todo.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className='!bg-card !border-border hover:!bg-muted/30 !flex !flex-row justify-between !gap-3 !rounded-2xl !border !p-3 !transition-all !duration-300 !ease-in-out hover:!shadow-md sm:!items-center sm:!p-4'>
        <div className='flex items-center gap-3 sm:gap-0'>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleCheckboxChange}
            disabled={updateTodoMutation.isPending}
            className='h-5 w-5 cursor-pointer sm:mr-2 sm:h-6 sm:w-6'
          />
          <div className='flex-1 sm:flex-1'>
            <h3
              className={`text-sm-semibold sm:text-base ${todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
            >
              {todo.title}
            </h3>
            <div className='mt-1 flex flex-row items-center gap-2'>
              <span className='text-muted-foreground text-xs sm:text-sm'>
                {new Date(todo.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span
                className={`mx-0 flex h-5 w-fit items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium sm:mx-4 sm:h-6 ${getPriorityColor(todo.priority)}`}
              >
                {getPriorityLabel(todo.priority)}
              </span>
            </div>
          </div>
        </div>
        <div className='flex justify-start'>
          <TodoActionsDropdown
            onEdit={handleEdit}
            onDelete={handleDelete}
            disabled={deleteTodoMutation.isPending}
            isDeleting={deleteTodoMutation.isPending}
          />
        </div>
      </Card>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title={todo.title}
        isLoading={deleteTodoMutation.isPending}
      />

      <EditTodosDialog
        todo={todo as any}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
};
