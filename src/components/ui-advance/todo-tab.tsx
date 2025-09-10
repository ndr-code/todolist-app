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
  'data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-foreground !text-xs sm:!text-sm !font-bold transition-all duration-200 ease-in-out hover:bg-muted/50 flex h-9 cursor-pointer items-center gap-1 sm:h-9 sm:gap-2';

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
      return 'text-neutral-500 !text-xs !font-bold transition-all duration-200 ease-in-out hover:bg-muted/50 flex h-8 cursor-pointer items-center gap-1 sm:h-9 sm:gap-2 sm:!text-sm sm:!font-bold';
    }
    return TAB_TRIGGER_CLASSNAME;
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={className}
    >
      <TabsList className='bg-card border-border grid h-12 w-full grid-cols-3 gap-1 border p-1 shadow-sm sm:h-14 sm:gap-2 sm:p-2'>
        <TabsTrigger value='today' className={getTabTriggerClassName()}>
          <span className='truncate'>Today</span>
        </TabsTrigger>

        <TabsTrigger value='upcoming' className={getTabTriggerClassName()}>
          <span className='truncate'>Upcoming</span>
        </TabsTrigger>

        <TabsTrigger value='completed' className={getTabTriggerClassName()}>
          <span className='truncate'>Completed</span>
        </TabsTrigger>
      </TabsList>

      {!hideContent && (
        <>
          <TabsContent
            value='today'
            className='mt-4 space-y-3 sm:mt-6 sm:space-y-4'
          >
            <TodoTabToday />
          </TabsContent>

          <TabsContent
            value='upcoming'
            className='mt-4 space-y-3 sm:mt-6 sm:space-y-4'
          >
            <TodoTabUpcoming />
          </TabsContent>

          <TabsContent
            value='completed'
            className='mt-4 space-y-3 sm:mt-6 sm:space-y-4'
          >
            <TodoTabCompleted isActive={activeTab === 'completed'} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
