# Checklist TodoList Frontend MVP

## Persiapan

- [x] Clone backend: `git clone https://github.com/Henryrivardo07/be_todolist.git`
- [x] Jalankan `npm install` di backend
- [x] Pastikan backend berjalan
- [x] Inisialisasi project frontend (Next.js + TypeScript)
- [x] Install dependencies: Tailwind CSS, shadcn/ui, Redux Toolkit, TanStack Query, Day.js

## Setup Project

- [x] Konfigurasi Tailwind CSS
- [x] Setup shadcn/ui
- [x] Setup Redux Toolkit (store, slice untuk filter & UI state)
- [x] Setup TanStack Query (Provider, hooks dasar)
- [x] Setup Day.js

## Fitur Utama

### 1. List Todos

- [ ] Fetch todos dari backend (GET /todos atau /todos/scroll)
- [ ] Tampilkan title, date, priority, status
- [ ] Badge warna untuk priority
- [ ] Format tanggal dengan Day.js

### 2. Add Todo

- [ ] Form input: title, priority, date
- [ ] Submit todo baru (POST /todos)
- [ ] Optimistic update: todo langsung muncul
- [ ] Rollback jika gagal

### 3. Toggle Completed

- [ ] Checkbox di setiap todo
- [ ] Optimistic toggle (PUT /todos/:id)

### 4. Delete Todo

- [ ] Tombol hapus di setiap todo
- [ ] Optimistic delete (DELETE /todos/:id)

### 5. Filter

- [ ] Filter by completed (all/active/completed)
- [ ] Filter by priority (low/medium/high)
- [ ] Filter by date range (gte/lte)

### 6. Sort

- [ ] Sort by date/priority
- [ ] Order asc/desc

### 7. Pagination

- [ ] Implementasi paging (page & limit)
- [ ] Implementasi infinite scroll (/todos/scroll)

### 8. Infinite Scroll

- [ ] Fetch batch pertama (nextCursor=0)
- [ ] Fetch batch berikutnya saat scroll
- [ ] Hentikan jika nextCursor=null

## State Management

- [ ] Simpan filter & view mode di Redux
- [ ] Query & mutation todos di TanStack Query

## UI/UX

- [ ] List Card: checkbox, title, tanggal, badge, tombol delete
- [ ] Filter Bar: dropdown, input date, tombol reset
- [ ] Infinite Scroll: sentinel div
- [ ] Skeleton loading, spinner, toast error
- [ ] Empty state jika hasil kosong
- [ ] Dark mode minimalis

## Acceptance Criteria

- [ ] Todos muncul dari backend
- [ ] Tambah, toggle, delete (optimistic)
- [ ] Filter & sort jalan
- [ ] Pagination & infinite scroll bekerja
- [ ] UI minimalis dark mode
- [ ] Loading, empty, error state muncul
