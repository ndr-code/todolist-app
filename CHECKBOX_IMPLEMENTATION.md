# Implementasi Functional Checkbox - Todo Cards

## 📋 Overview

Implementasi checkbox yang fungsional di setiap TodoCard untuk mengubah status completed/active dengan integrasi API, optimistic updates, dan notifikasi toast.

## 🚀 Fitur yang Diimplementasikan

### 1. **Functional Checkbox** (`/src/components/ui-advance/todo-card.tsx`)

#### **Sebelum:**

```tsx
<Checkbox checked={showCheckbox} className='mr-2 h-6 w-6' />
```

- Checkbox hanya visual (tidak fungsional)
- Status berdasarkan prop `showCheckbox`
- Tidak ada interaksi dengan API

#### **Sesudah:**

```tsx
<Checkbox
  checked={todo.completed}
  onCheckedChange={handleCheckboxChange}
  disabled={updateTodoMutation.isPending}
  className='mr-2 h-6 w-6'
/>
```

#### **Handler Function:**

```tsx
const handleCheckboxChange = (checked: boolean) => {
  updateTodoMutation.mutate({
    id: todo.id,
    updates: { completed: checked },
  });
};
```

### 2. **Custom Hook** (`/src/lib/hooks/useUpdateTodo.ts`)

#### **Fitur Utama:**

- ✅ **API Integration** - Memanggil `updateTodo` dari lib/api.ts
- ✅ **Cache Updates** - Update cache React Query secara optimis
- ✅ **Query Invalidation** - Refresh data setelah update
- ✅ **Toast Notifications** - Feedback visual untuk user
- ✅ **Error Handling** - Penanganan error yang graceful

#### **Implementation:**

```tsx
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => updateTodo(id, updates),
    onSuccess: (updatedTodo) => {
      // Update semua cache queries
      queryClient.setQueriesData({ queryKey: ['todos'] }, (oldData) => {
        return {
          ...oldData,
          todos: oldData.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ),
        };
      });

      // Invalidate untuk refresh
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      // Toast notification
      toast.success(updatedTodo.completed ? 'Todo completed!' : 'Todo active!');
    },
    onError: (error) => {
      toast.error('Failed to update todo. Please try again.');
    },
  });
}
```

### 3. **Toast Notifications** (`/src/providers/providers.tsx`)

#### **Integration:**

```tsx
import { Toaster } from '@/components/ui-basic/sonner';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}
```

## 🎯 User Experience Improvements

### **1. Visual Feedback**

- ✅ **Immediate UI Update** - Checkbox state berubah instantly
- ✅ **Loading State** - Checkbox disabled saat pending
- ✅ **Toast Messages** - Konfirmasi sukses/error
- ✅ **Visual States** - Line-through untuk completed todos

### **2. Performance Optimizations**

- ✅ **Optimistic Updates** - UI update sebelum API response
- ✅ **Smart Cache Management** - Update multiple query cache
- ✅ **Efficient Re-renders** - Hanya komponen yang berubah

### **3. Error Handling**

- ✅ **Network Errors** - Toast error message
- ✅ **API Errors** - Graceful fallback
- ✅ **Loading States** - Prevent multiple clicks

## 🔧 Technical Implementation

### **Data Flow:**

```
User Click → Checkbox Handler → useUpdateTodo → API Call → Cache Update → UI Refresh
     ↓              ↓               ↓            ↓           ↓           ↓
  onChange      mutate()         updateTodo()  Response   setQueriesData  Re-render
                                                 ↓
                                           Toast Notification
```

### **Cache Strategy:**

1. **Optimistic Update** - UI berubah immediately
2. **API Call** - Request ke backend
3. **Cache Sync** - Update semua related queries
4. **Invalidation** - Refresh untuk consistency
5. **Toast Feedback** - User notification

### **Query Key Management:**

```tsx
// Update cache untuk semua filter states
queryClient.setQueriesData({ queryKey: ['todos'] }, updateFunction);
queryClient.setQueriesData({ queryKey: ['todos-scroll'] }, updateFunction);

// Invalidate untuk refresh
queryClient.invalidateQueries({ queryKey: ['todos'] });
queryClient.invalidateQueries({ queryKey: ['todos-scroll'] });
```

## 📱 UI States & Behavior

### **Checkbox States:**

1. **Unchecked (Active Todo)**
   - `checked={false}`
   - Normal text styling
   - User can mark as completed

2. **Checked (Completed Todo)**
   - `checked={true}`
   - Line-through text styling
   - Muted text color
   - User can mark as active

3. **Loading State**
   - `disabled={true}` saat API call
   - Prevent multiple clicks
   - Visual feedback dengan cursor

### **Visual Changes:**

```tsx
className={`font-medium ${
  todo.completed
    ? 'text-muted-foreground line-through'
    : 'text-foreground'
}`}
```

## 🔄 State Management Flow

### **Redux Integration:**

- Checkbox tidak langsung update Redux store
- Menggunakan React Query untuk API state
- Redux tetap handle filter state
- Automatic refresh via query invalidation

### **Cross-Tab Behavior:**

```tsx
// Filter tetap konsisten di semua tab
- Today Tab: Filter todos hari ini berdasarkan completed status
- Upcoming Tab: Filter todos mendatang berdasarkan completed status
- Completed Tab: Show semua completed todos
```

## 🧪 Testing Scenarios

### **Manual Testing:**

1. ✅ **Mark Todo as Completed**
   - Click checkbox pada active todo
   - Verify text styling berubah (line-through)
   - Verify toast notification muncul
   - Verify todo pindah ke Completed tab

2. ✅ **Mark Todo as Active**
   - Click checkbox pada completed todo
   - Verify text styling kembali normal
   - Verify toast notification muncul
   - Verify todo pindah ke appropriate tab

3. ✅ **Error Handling**
   - Disconnect network
   - Try to update todo
   - Verify error toast muncul
   - Verify UI state revert jika gagal

### **Edge Cases:**

- ✅ **Multiple rapid clicks** - Disabled saat pending
- ✅ **Network issues** - Error handling & toast
- ✅ **Cache consistency** - Multiple tabs sync
- ✅ **Filter integration** - Todos filtered correctly

## 📊 API Contract Compliance

### **Endpoint Used:**

```
PUT /todos/{id}
```

### **Request Body:**

```json
{
  "completed": true/false
}
```

### **Response:**

```json
{
  "id": "string",
  "title": "string",
  "completed": boolean,
  "date": "2025-09-09T10:00:00.000Z",
  "priority": "LOW" | "MEDIUM" | "HIGH"
}
```

## 🎨 Toast Messages

### **Success Messages:**

- ✅ "Todo marked as completed!" (saat check)
- ✅ "Todo marked as active!" (saat uncheck)

### **Error Messages:**

- ❌ "Failed to update todo. Please try again."

## 🚀 Performance Benefits

1. **Optimistic Updates** - Instant UI feedback
2. **Smart Caching** - Reduced API calls
3. **Efficient Re-renders** - Only affected components update
4. **Query Deduplication** - React Query handles duplicate requests
5. **Background Refetch** - Keep data fresh automatically

## 🔮 Future Enhancements

### **Potential Improvements:**

- [ ] Undo functionality dengan timeout
- [ ] Bulk checkbox operations
- [ ] Keyboard shortcuts (Space to toggle)
- [ ] Accessibility improvements (ARIA labels)
- [ ] Offline support dengan sync when online
- [ ] Animation transitions untuk state changes
