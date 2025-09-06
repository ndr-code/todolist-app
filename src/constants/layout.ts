export const title = 'Todolist App';
export const description = 'A simple todo list application.';

export const layout = [
  {
    id: 'Header',
    child: ['title', 'description'],
  },
  {
    id: 'Toggle',
    child: ['light', 'dark'],
  },
  {
    id: 'Searchbar',
  },
  {
    id: 'Sort',
  },
  {
    id: 'Tabs',
    tab: [
      {
        name: 'Today',
        title: 'Today',
        date: 'date',
        content: '[Tasks], addTask',
      },
      {
        name: 'Upcoming',
        title: 'Upcoming',
        date: 'date',
        dateTabs: ['d-2', 'd-1', 'd-day', 'd+1', 'd+2'],
        dateSwitch: 'date',
        content: '[Tasks], addTask',
      },
      {
        name: 'Completed',
        title: 'Completed',
        content: '[Tasks], addTask',
      },
    ],
  },
];
