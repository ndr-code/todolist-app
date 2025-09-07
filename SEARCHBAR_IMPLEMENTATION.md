# Implementasi Searchbar - Todo List App

## 📋 Overview

Implementasi fitur searchbar yang terintegrasi dengan API backend sesuai dengan API_CONTRACT.md. Searchbar dilengkapi dengan debouncing, integrasi Redux state management, dan UI yang responsif.

## 🚀 Fitur yang Diimplementasikan

### 1. **Searchbar Component** (`/src/components/ui-advance/searchbar.tsx`)

- ✅ Input field dengan placeholder "Search todos..."
- ✅ Search icon di sebelah kiri
- ✅ Clear button (X) yang muncul saat ada text
- ✅ Debouncing 300ms untuk optimasi API calls
- ✅ Responsive design dengan Tailwind CSS

### 2. **Custom Hooks**

#### **useSearch Hook** (`/src/lib/hooks/useSearch.ts`)

- ✅ State management untuk search query
- ✅ Debouncing mechanism (300ms)
- ✅ Auto-dispatch ke Redux store
- ✅ Clear search functionality

#### **useTodos Hook** (`/src/lib/hooks/useTodos.ts`)

- ✅ Integrasi dengan Redux filter state
- ✅ Support untuk pagination dan infinite scroll
- ✅ Transform Redux state ke API parameters
- ✅ React Query integration untuk caching

### 3. **Redux State Management**

#### **Filter Slice** (`/src/store/slices/filterSlice.ts`)

- ✅ Tambahan `searchText` state
- ✅ Action `setSearchText` untuk update search query
- ✅ Terintegrasi dengan filter dan sort state lainnya

### 4. **API Integration** (`/src/lib/api.ts`)

- ✅ Tambahan parameter `title` untuk text search
- ✅ Support untuk semua filter parameters sesuai API contract
- ✅ TypeScript interfaces yang lengkap

### 5. **Component Updates**

#### **FilterButton** (`/src/components/ui-advance/filter-button-new.tsx`)

- ✅ Redux integration
- ✅ Visual indicator untuk active filters
- ✅ Support untuk status dan priority filtering
- ✅ Reset filters functionality

#### **SortButton** (`/src/components/ui-advance/sort-button-new.tsx`)

- ✅ Redux integration
- ✅ Sort by date atau priority
- ✅ Ascending/Descending order
- ✅ Visual icons untuk sorting direction

#### **TodoCard** (`/src/components/ui-advance/todo-card.tsx`)

- ✅ Update priority format (LOW/MEDIUM/HIGH)
- ✅ Formatted date display
- ✅ User-friendly priority labels

#### **TodoTabToday** (`/src/components/ui-advance/todo-tab-today.tsx`)

- ✅ Integrasi dengan real API data
- ✅ Loading dan error states
- ✅ Filter untuk today's todos
- ✅ Dynamic item count

## 🔧 Technical Implementation

### State Flow

1. User types in searchbar
2. `useSearch` hook captures input dengan debouncing
3. Redux action `setSearchText` triggered
4. `useTodos` hook detects state change
5. API call dengan parameter search `title`
6. UI updates dengan filtered results

### API Integration

```typescript
// Search API call example
fetchTodos({
  title: 'buy groceries', // search text
  completed: false, // filter completed
  priority: 'HIGH', // filter priority
  sort: 'date', // sort field
  order: 'desc', // sort order
});
```

### Redux State Structure

```typescript
interface FilterState {
  completed: 'all' | 'active' | 'completed';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'all';
  dateGte?: string;
  dateLte?: string;
  sort: 'date' | 'priority';
  order: 'asc' | 'desc';
  viewMode: 'page' | 'scroll';
  searchText?: string; // NEW
}
```

## 🎯 Key Features

### 1. **Debounced Search**

- Mengurangi API calls dengan delay 300ms
- UX yang smooth tanpa lag

### 2. **Real-time Filtering**

- Search terintegrasi dengan filter lainnya
- Kombinasi search + status + priority + sort

### 3. **Visual Feedback**

- Clear button muncul saat ada text
- Loading states saat fetching data
- Active filter indicators

### 4. **Type Safety**

- Full TypeScript integration
- API contract compliance
- Runtime type validation dengan Zod

## 📁 File Structure

```
src/
├── components/ui-advance/
│   ├── searchbar.tsx              # Main searchbar component
│   ├── filter-button-new.tsx     # Updated filter component
│   ├── sort-button-new.tsx       # Updated sort component
│   └── todo-card.tsx              # Updated todo display
├── lib/
│   ├── api.ts                     # API functions dengan search support
│   └── hooks/
│       ├── useSearch.ts           # Search logic hook
│       └── useTodos.ts            # Todos data hook
├── store/slices/
│   └── filterSlice.ts             # Redux state dengan search
└── types/
    ├── todos.ts                   # API types
    └── todoItem.ts                # UI types
```

## 🚀 Usage

```tsx
// Automatic integration - searchbar sudah terhubung ke semua komponen
<SearchBar />; // Component siap pakai

// Manual usage di custom components
const { searchQuery, handleSearchChange, clearSearch } = useSearch();
const { todos, isLoading, error } = useTodos();
```

## ✅ API Contract Compliance

Implementasi ini sesuai dengan API_CONTRACT.md:

- ✅ GET `/todos` dengan parameter `title` untuk search
- ✅ Support untuk semua filter parameters
- ✅ Pagination dan infinite scroll
- ✅ Proper error handling
- ✅ TypeScript types sesuai API response

## 🎨 UI/UX Improvements

1. **Responsive Design** - Searchbar menyesuaikan ukuran layar
2. **Visual Indicators** - Clear button dan loading states
3. **Smooth Animations** - Transition effects
4. **Accessibility** - Proper ARIA labels dan keyboard navigation

## 🧪 Testing Ready

Structure yang dibuat memudahkan testing:

- Isolated custom hooks
- Pure components
- Mocked API calls
- Redux state testing

## 📈 Performance Optimizations

1. **Debouncing** - Mengurangi API calls
2. **React Query Caching** - Data persistence
3. **Memoized Components** - Mencegah re-render
4. **Optimized Bundle** - Code splitting ready
