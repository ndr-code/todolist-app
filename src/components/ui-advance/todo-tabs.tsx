'use client';

import { CheckCircle2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui-basic/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui-basic/tabs';

import { mockTodos, completedTodos } from '@/constants/mockTodos';

import { TodoCard } from './todo-card';

export type TodoTabValue = 'today' | 'upcoming' | 'completed';

interface TodoTabsProps {
  defaultValue?: TodoTabValue;
  onValueChange?: (value: TodoTabValue) => void;
  className?: string;
}

export function TodoTabs({
  defaultValue = 'today',
  onValueChange,
  className,
}: TodoTabsProps) {
  const [activeTab, setActiveTab] = useState<TodoTabValue>(defaultValue);

  const handleTabChange = (value: string) => {
    const tab = value as TodoTabValue;
    setActiveTab(tab);
    onValueChange?.(tab);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={className}
    >
      <TabsList className='bg-card border-border grid h-14 w-full grid-cols-3 border p-2 shadow-sm'>
        <TabsTrigger
          value='today'
          className='data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-foreground text-sm-semibold flex h-9 items-center gap-2 font-medium'
        >
          <span>Today</span>
        </TabsTrigger>

        <TabsTrigger
          value='upcoming'
          className='data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-foreground text-sm-semibold flex h-9 items-center gap-2 font-medium'
        >
          <span>Upcoming</span>
        </TabsTrigger>

        <TabsTrigger
          value='completed'
          className='data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-foreground text-sm-semibold flex h-9 items-center gap-2 font-medium'
        >
          <span>Completed</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value='today' className='mt-6 space-y-4'>
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

        <div className='space-y-3'>
          {mockTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
        <div className='flex w-full items-center justify-center'>
          <Button className='h-12 w-75 gap-2'>
            <Plus className='h-4 w-4' />
            Add Task
          </Button>
        </div>
      </TabsContent>

      <TabsContent value='upcoming' className='mt-6 space-y-4'>
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
                <span className='text-muted-foreground text-sm'>
                  Aug 5, 2025
                </span>
              </div>
            </div>
            <div className='border-border bg-card flex h-9 items-center justify-around gap-1 rounded-md border'>
              <button className='hover:bg-muted rounded p-1'>
                <ChevronLeft className='h-5 w-5' />
              </button>
              <span className='text-muted-foreground text-sm'>Today</span>
              <button className='hover:bg-muted rounded p-1'>
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Week View */}
        <div className='mb-4 flex gap-2'>
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

        <div className='flex w-full items-center justify-center'>
          <Button className='h-12 w-75 gap-2'>
            <Plus className='h-4 w-4' />
            Add Task
          </Button>
        </div>
      </TabsContent>

      <TabsContent value='completed' className='mt-6 space-y-4'>
        <div className='mb-4 flex items-center gap-2'>
          <CheckCircle2 className='text-foreground h-6 w-6' />
          <h2 className='text-foreground display-xs-bold'>Completed</h2>
          <span className='text-muted-foreground text-xs-semibold ml-2 rounded-full bg-neutral-400 px-3'>
            {completedTodos.length}{' '}
            {completedTodos.length > 1 ? 'items' : 'item'}
          </span>
        </div>

        <div className='space-y-3'>
          {completedTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} showCheckbox={true} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
