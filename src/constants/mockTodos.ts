import { TodoItem } from '@/types/todoItem';

export const mockTodos: TodoItem[] = [
  {
    id: '1',
    title: 'Practice about Frontend Developer',
    date: 'Aug 5, 2025',
    priority: 'Low',
    completed: false,
  },
  {
    id: '2',
    title: 'Complete JavaScript Algorithms',
    date: 'Sep 12, 2025',
    priority: 'Medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Build a Responsive Website',
    date: 'Oct 20, 2025',
    priority: 'High',
    completed: false,
  },
  {
    id: '4',
    title: 'Explore CSS Frameworks',
    date: 'Nov 15, 2025',
    priority: 'Low',
    completed: false,
  },
];

export const completedTodos: TodoItem[] = [
  {
    id: '5',
    title: 'Practice about Frontend Developer',
    date: 'Aug 5, 2025',
    priority: 'Low',
    completed: true,
  },
  {
    id: '6',
    title: 'Complete JavaScript Algorithms',
    date: 'Sep 12, 2025',
    priority: 'Medium',
    completed: true,
  },
  {
    id: '7',
    title: 'Build a Responsive Website',
    date: 'Oct 20, 2025',
    priority: 'High',
    completed: true,
  },
  {
    id: '8',
    title: 'Explore CSS Frameworks',
    date: 'Nov 15, 2025',
    priority: 'Low',
    completed: true,
  },
];
