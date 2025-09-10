'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui-basic/button';
import { Calendar } from '@/components/ui-basic/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui-basic/dialog';
import { Input } from '@/components/ui-basic/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui-basic/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui-basic/select';

import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { Todo } from '@/types/todos';

interface EditTodosDialogProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTodosDialog({
  todo,
  open,
  onOpenChange,
}: EditTodosDialogProps) {
  const [task, setTask] = React.useState(todo.title);
  const [priority, setPriority] = React.useState<
    'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  >(todo.priority === 'HIGH' ? 'URGENT' : todo.priority);
  const [date, setDate] = React.useState<Date | undefined>(new Date(todo.date));

  const updateTodoMutation = useUpdateTodo();

  // Reset form when todo prop changes or dialog opens
  React.useEffect(() => {
    if (open) {
      setTask(todo.title);
      setPriority(todo.priority === 'HIGH' ? 'URGENT' : todo.priority);
      setDate(new Date(todo.date));
    }
  }, [open, todo]);

  // Reset form when todo changes or dialog opens
  React.useEffect(() => {
    if (open) {
      setTask(todo.title);
      setPriority(todo.priority === 'HIGH' ? 'URGENT' : todo.priority);
      setDate(new Date(todo.date));
    }
  }, [open, todo]);

  const handleSave = async () => {
    if (!isFormValid) return;

    // Map URGENT to HIGH for API compatibility
    const apiPriority = priority === 'URGENT' ? 'HIGH' : priority;

    const updates: Partial<Todo> = {
      title: task.trim(),
      priority: apiPriority as 'LOW' | 'MEDIUM' | 'HIGH',
      date: date?.toISOString(),
    };

    try {
      await updateTodoMutation.mutateAsync({
        id: todo.id,
        updates,
      });

      onOpenChange(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    // Reset form when canceling
    setTask(todo.title);
    setPriority(todo.priority === 'HIGH' ? 'URGENT' : todo.priority);
    setDate(new Date(todo.date));
    onOpenChange(false);
  };

  const isFormValid = task.trim() !== '' && priority && date;

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isFormValid) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4' onKeyDown={handleKeyDown}>
          {/* Task Input */}
          <div className='grid gap-2'>
            <Input
              placeholder='Enter your task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              autoFocus
            />
          </div>

          {/* Priority Select */}
          <div className='grid gap-2'>
            <Select
              value={priority}
              onValueChange={(value) =>
                setPriority(value as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='LOW'>Low</SelectItem>
                <SelectItem value='MEDIUM'>Medium</SelectItem>
                <SelectItem value='HIGH'>High</SelectItem>
                <SelectItem value='URGENT'>Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <div className='grid gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  data-empty={!date}
                  className='data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Save Button */}
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={handleCancel}
              className='flex-1'
              disabled={updateTodoMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isFormValid || updateTodoMutation.isPending}
              className='flex-1'
            >
              {updateTodoMutation.isPending ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
