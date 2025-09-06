# MVP Guide - TodoList Frontend

## Tujuan

Membangun Frontend MVP TodoList yang terhubung dengan backend `be_todolist`.

### Menjalankan Backend

```bash
git clone https://github.com/Henryrivardo07/be_todolist.git
npm install
npm start
```

## Tech Stack Wajib

- **React.js + TypeScript** — framework & type safety
- **Tailwind CSS** — styling cepat
- **shadcn/ui** — komponen UI
- **Redux Toolkit** — menyimpan filter & state UI
- **TanStack Query (React Query)** — data fetching & caching
- **Optimistic UI** — UX responsif, update tanpa tunggu server
- **Day.js** — format tanggal

## API

### GET `/todos`

- Untuk pagination biasa (`page`, `limit`)
- Response: `todos`, `totalTodos`, `hasNextPage`, `nextPage`

### GET `/todos/scroll`

- Untuk infinite scroll (lazy load)
- Query: `completed`, `priority`, `dateGte`, `dateLte`, `sort`, `order`, `nextCursor`, `limit`
- Response: `todos`, `nextCursor`, `hasNextPage`

### POST `/todos`

- Buat todo baru. Body: `{ title, completed?, date?, priority? }`

### PUT `/todos/:id`

- Update todo (`title`, `completed`, `date`, `priority`)

### DELETE `/todos/:id`

- Hapus todo

## MVP Features

1. **List Todos**
   - Tampilkan title, date, priority, status
   - Badge warna untuk priority
   - Format tanggal rapi
2. **Add Todo**
   - Input: title, priority, date
   - Setelah submit → langsung muncul (optimistic)
   - Rollback jika gagal
3. **Toggle Completed**
   - Checkbox di setiap todo
   - Optimistic toggle
4. **Delete Todo**
   - Tombol hapus
   - Optimistic delete
5. **Filter**
   - By completed (all/active/completed)
   - By priority (low/medium/high)
   - By date range (gte/lte)
6. **Sort**
   - By date atau priority
   - Order asc/desc
7. **Pagination**
   - Versi A: paging dengan page & limit
   - Versi B: Infinite Scroll (pakai `/todos/scroll`)
8. **Infinite Scroll**
   - Fetch batch pertama (`nextCursor=0`)
   - Saat user scroll ke bawah → fetch batch berikutnya
   - Hentikan jika `nextCursor=null`

## State Management

- **Redux Toolkit**
  - Simpan filter: completed, priority, dateGte, dateLte, sort, order
  - Simpan view mode: "page" atau "scroll"
- **TanStack Query**
  - Query: list todos (pagination atau scroll)
  - Mutations: add, toggle, delete

## User Flow

1. User membuka halaman → fetch list awal (10 item)
2. Scroll ke bawah → load lebih banyak (scroll mode)
3. Add todo → muncul instan di atas list (optimistic)
4. Toggle completed → update instan
5. Delete todo → langsung hilang
6. Ubah filter/sort → reset list, fetch ulang dari awal
7. Jika hasil kosong → tampilkan empty state

## UI/UX Guidelines

- **List Card**:
  - Kiri: checkbox + title
  - Bawah: tanggal + badge priority
  - Kanan: tombol delete
- **Filter Bar**:
  - Dropdown priority, completed, sort, order
  - Input date range
  - Tombol reset
- **Infinite Scroll**: sentinel div di bawah list
- **Feedback**:
  - Skeleton saat load awal
  - Spinner saat load batch berikutnya
  - Toast error jika fetch gagal

## Acceptance Criteria

- Todos muncul dari backend
- Bisa tambah, toggle, delete (optimistic)
- Filter priority/completed/date jalan
- Sort by date/priority jalan
- Pagination & infinite scroll bekerja
- UI minimalis dark mode dengan Tailwind + shadcn
- Ada loading, empty, dan error state
