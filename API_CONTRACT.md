# Todo API Documentation

**Version:** 1.0.0  
**Specification:** OpenAPI 3.0  
**Description:** API documentation for managing todo items

## Base URL
All endpoints are relative to the base URL of your API server.

## Data Models

### Todo Object
```json
{
  "id": "string",
  "title": "string", 
  "completed": boolean,
  "date": "2025-09-06T15:59:44.636Z",
  "priority": "LOW" | "MEDIUM" | "HIGH"
}
```

### Priority Values
- `LOW`
- `MEDIUM` 
- `HIGH`

## Endpoints

### 1. Create Todo
**POST** `/todos`

Creates a new todo item.

**Request Body:**
```json
{
  "title": "string",
  "completed": false,
  "date": "2025-09-06T15:59:44.636Z",
  "priority": "MEDIUM"
}
```

**Responses:**
- **200 OK** - Returns the created todo object
- **500 Internal Server Error** - Server error

---

### 2. Get Todos (Paginated)
**GET** `/todos`

Retrieves todos with optional filtering, pagination, and sorting.

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `completed` | boolean | Filter by completion status | - |
| `priority` | string | Filter by priority (LOW, MEDIUM, HIGH) | - |
| `dateGte` | string (ISO 8601) | Filter todos with date >= this value | - |
| `dateLte` | string (ISO 8601) | Filter todos with date <= this value | - |
| `page` | integer | Page number (starting from 1) | 1 |
| `limit` | integer | Number of todos per page | 10 |
| `sort` | string | Sort field (id, title, completed, date, priority) | - |
| `order` | string | Sort order (asc, desc) | asc |

**Response (200 OK):**
```json
{
  "todos": [
    {
      "id": "string",
      "title": "string",
      "completed": true,
      "date": "2025-09-06T15:59:54.080Z",
      "priority": "LOW"
    }
  ],
  "totalTodos": 0,
  "hasNextPage": true,
  "nextPage": 0
}
```

**Other Responses:**
- **500 Internal Server Error** - Server error

---

### 3. Get Todos (Infinite Scroll)
**GET** `/todos/scroll`

Retrieves todos with optional filtering, sorting, and infinite scrolling support.

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `completed` | boolean | Filter by completion status | - |
| `nextCursor` | integer | Starting index for next batch | 0 |
| `limit` | integer | Number of todos per request | 10 |
| `sort` | string | Sort field (title, date) | - |
| `order` | string | Sort order (asc, desc) | asc |

**Response (200 OK):**
```json
{
  "todos": [
    {
      "id": "string",
      "title": "string", 
      "completed": true,
      "date": "2025-09-06T16:00:18.292Z",
      "priority": "LOW"
    }
  ],
  "nextCursor": 0,
  "hasNextPage": true
}
```

**Other Responses:**
- **500 Internal Server Error** - Server error

---

### 4. Update Todo
**PUT** `/todos/{id}`

Updates an existing todo by ID.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The ID of the todo to update |

**Request Body:**
```json
{
  "title": "string",
  "completed": false,
  "date": "2025-09-06T16:00:10.145Z",
  "priority": "MEDIUM"
}
```

**Responses:**
- **200 OK** - Returns the updated todo object
- **404 Not Found** - Todo not found
- **500 Internal Server Error** - Server error

---

### 5. Delete Todo
**DELETE** `/todos/{id}`

Deletes a todo by ID.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The ID of the todo to delete |

**Responses:**
- **200 OK** - Returns the deleted todo object
- **404 Not Found** - Todo not found  
- **500 Internal Server Error** - Server error

## Usage Examples

### Create a new todo
```bash
curl -X POST /todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "completed": false,
    "date": "2025-09-07T10:00:00.000Z",
    "priority": "HIGH"
  }'
```

### Get all todos with filtering
```bash
curl "/todos?completed=false&priority=HIGH&page=1&limit=5&sort=date&order=desc"
```

### Update a todo
```bash
curl -X PUT /todos/123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries - Updated",
    "completed": true,
    "date": "2025-09-07T10:00:00.000Z", 
    "priority": "MEDIUM"
  }'
```

### Delete a todo
```bash
curl -X DELETE /todos/123
```

## Notes

- All date fields use ISO 8601 format
- The API supports both traditional pagination (`/todos`) and infinite scrolling (`/todos/scroll`)
- Filtering can be combined with sorting and pagination
- All endpoints return JSON responses
- Error responses include appropriate HTTP status codes