'use client';

import { useState } from 'react';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui-basic/tabs';

import TodoTabCompleted from './todo-tab-completed';
import TodoTabToday from './todo-tab-today';
import TodoTabUpcoming from './todo-tab-upcoming';

export type TodoTabValue = 'today' | 'upcoming' | 'completed';

const TAB_TRIGGER_CLASSNAME =
  'data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-foreground text-sm-semibold hover:bg-muted/50 flex h-9 cursor-pointer items-center gap-2 font-medium transition-all duration-200 ease-in-out ';

interface TodoTabsProps {
  defaultValue?: TodoTabValue;
  onValueChange?: (value: TodoTabValue) => void;
  className?: string;
  hideContent?: boolean;
  onTabClick?: () => void;
  forceInactiveState?: boolean; // New prop to force all tabs to look inactive
}

export function TodoTabs({
  defaultValue = 'today',
  onValueChange,
  className,
  hideContent = false,
  onTabClick,
  forceInactiveState = false,
}: TodoTabsProps) {
  const [activeTab, setActiveTab] = useState<TodoTabValue>(defaultValue);

  const handleTabChange = (value: string) => {
    const tab = value as TodoTabValue;
    setActiveTab(tab);
    onValueChange?.(tab);
    onTabClick?.(); // Call the callback when tab is clicked
  };

  // Custom className for inactive state
  const getTabTriggerClassName = () => {
    if (forceInactiveState) {
      // Force inactive styling - remove active state styling
      return 'text-sm-semibold hover:bg-muted/30 flex h-9 cursor-pointer items-center gap-2 font-medium transition-all duration-200 ease-in-out ';
    }
    return TAB_TRIGGER_CLASSNAME;
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={className}
    >
      <TabsList className='bg-card border-border grid h-14 w-full grid-cols-3 gap-2 border p-2 shadow-sm'>
        <TabsTrigger value='today' className={getTabTriggerClassName()}>
          <span>Today</span>
        </TabsTrigger>

        <TabsTrigger value='upcoming' className={getTabTriggerClassName()}>
          <span>Upcoming</span>
        </TabsTrigger>

        <TabsTrigger value='completed' className={getTabTriggerClassName()}>
          <span>Completed</span>
        </TabsTrigger>
      </TabsList>

      {!hideContent && (
        <>
          <TabsContent value='today' className='mt-6 space-y-4'>
            <TodoTabToday />
          </TabsContent>

          <TabsContent value='upcoming' className='mt-6 space-y-4'>
            <TodoTabUpcoming />
          </TabsContent>

          <TabsContent value='completed' className='mt-6 space-y-4'>
            <TodoTabCompleted isActive={activeTab === 'completed'} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
