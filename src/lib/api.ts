import { Todo, NewTodo } from '@/types/todos';

// Configuration for API usage
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Log which API URL we're using
if (typeof window !== 'undefined') {
  console.info('[api] API_BASE_URL:', API_BASE_URL);
  console.info('[api] API_KEY configured:', !!API_KEY);
}

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
  title?: string;
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

async function safeFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  // Prepare headers with API key
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init?.headers as Record<string, string>) || {}),
  };

  // Add API key if available
  if (API_KEY) {
    headers['api-key'] = API_KEY;
  }

  const requestInit: RequestInit = {
    ...init,
    headers,
  };

  const res = await fetch(input, requestInit);
  if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
  return (await res.json()) as T;
}

// GET /todos - Paginated
export async function fetchTodos(
  params: PaginationParams = {}
): Promise<TodosResponse> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, value.toString());
  });

  return await safeFetch<TodosResponse>(
    `${API_BASE_URL}/todos?${searchParams}`
  );
}

// GET /todos/scroll - Infinite scroll
export async function fetchTodosScroll(
  params: ScrollParams = {}
): Promise<TodosScrollResponse> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, value.toString());
  });

  return await safeFetch<TodosScrollResponse>(
    `${API_BASE_URL}/todos/scroll?${searchParams}`
  );
}

// POST /todos - Create todo
export async function createTodo(newTodo: NewTodo): Promise<Todo> {
  return await safeFetch<Todo>(`${API_BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(newTodo),
  });
}

// PUT /todos/:id - Update todo
export async function updateTodo(
  id: string,
  updatedTodo: Partial<Todo>
): Promise<Todo> {
  return await safeFetch<Todo>(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedTodo),
  });
}

// DELETE /todos/:id - Delete todo
export async function deleteTodo(id: string): Promise<Todo> {
  return await safeFetch<Todo>(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
}
