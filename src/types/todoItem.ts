export interface TodoItem {
  id: string;
  title: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}
