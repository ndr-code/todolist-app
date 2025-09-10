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
  DialogTrigger,
} from '@/components/ui-basic/dialog';
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

import { useCreateTodo } from '@/hooks/useCreateTodo';
import { NewTodo } from '@/types/todos';

interface AddTodosDialogProps {
  children: React.ReactNode;
  defaultDate?: Date;
}

export function AddTodosDialog({ children, defaultDate }: AddTodosDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState('');
  const [priority, setPriority] = React.useState<'LOW' | 'MEDIUM' | 'HIGH'>(
    'MEDIUM'
  );
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);

  const createTodoMutation = useCreateTodo();

  const handleSave = async () => {
    if (!isFormValid) return;

    const newTodo: NewTodo = {
      title: task.trim(),
      priority: priority as 'LOW' | 'MEDIUM' | 'HIGH',
      date: date?.toISOString(),
      completed: false,
    };

    try {
      await createTodoMutation.mutateAsync(newTodo);

      // Reset form
      setTask('');
      setPriority('MEDIUM');
      setDate(defaultDate);
      setOpen(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Error creating todo:', error);
    }
  };

  const handleCancel = () => {
    // Reset form when canceling
    setTask('');
    setPriority('MEDIUM');
    setDate(defaultDate);
    setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-foreground'>Add Task</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4' onKeyDown={handleKeyDown}>
          {/* Task Input */}
          <div className='grid gap-2'>
            <textarea
              placeholder='Enter your task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              autoFocus
              rows={2}
              className='border-input bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>

          {/* Priority Select */}
          <div className='grid gap-2'>
            <Select
              value={priority}
              onValueChange={(value) =>
                setPriority(value as 'LOW' | 'MEDIUM' | 'HIGH')
              }
            >
              <SelectTrigger className='text-foreground h-12 w-full rounded-xl'>
                <SelectValue placeholder='Select priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='LOW'>Low</SelectItem>
                <SelectItem value='MEDIUM'>Medium</SelectItem>
                <SelectItem value='HIGH'>High</SelectItem>
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
              disabled={createTodoMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isFormValid || createTodoMutation.isPending}
              className='flex-1'
            >
              {createTodoMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
