import { Todo, NewTodo } from '@/types/todos';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Types for API responses
interface TodosResponse {
  todos: Todo[];
  totalTodos: number;
  hasNextPage: boolean;
  nextPage: number;
}

interface TodosScrollResponse {
  todos: Todo[];
  nextCursor: number;
  hasNextPage: boolean;
}

interface FilterParams {
  completed?: boolean;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dateGte?: string;
  dateLte?: string;
  sort?: 'id' | 'title' | 'completed' | 'date' | 'priority';
  order?: 'asc' | 'desc';
}

interface PaginationParams extends FilterParams {
  page?: number;
  limit?: number;
}

interface ScrollParams extends FilterParams {
  nextCursor?: number;
  limit?: number;
}

// GET /todos - Paginated
export async function fetchTodos(
  params: PaginationParams = {}
): Promise<TodosResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });

  const res = await fetch(`${API_BASE_URL}/todos?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

// GET /todos/scroll - Infinite scroll
export async function fetchTodosScroll(
  params: ScrollParams = {}
): Promise<TodosScrollResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });

  const res = await fetch(`${API_BASE_URL}/todos/scroll?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch todos (scroll)');
  return res.json();
}

// POST /todos - Create todo
export async function createTodo(newTodo: NewTodo): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

// PUT /todos/:id - Update todo
export async function updateTodo(
  id: string,
  updatedTodo: Partial<Todo>
): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error('Todo not found');
    throw new Error('Failed to update todo');
  }
  return res.json();
}

// DELETE /todos/:id - Delete todo
export async function deleteTodo(id: string): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error('Todo not found');
    throw new Error('Failed to delete todo');
  }
  return res.json();
}
