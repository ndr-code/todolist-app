export interface TodoItem {
  id: string;
  title: string;
  date: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH'; // Match API format
  completed: boolean;
}
