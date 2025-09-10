import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterState = {
  completed: 'all' | 'active' | 'completed';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'all';
  dateGte?: string;
  dateLte?: string;
  sort: 'date' | 'priority';
  order: 'asc' | 'desc';
  viewMode: 'page' | 'scroll';
  searchText?: string;
  showViewConfig: boolean;
};

const initialState: FilterState = {
  completed: 'all',
  priority: 'all',
  sort: 'date',
  order: 'asc',
  viewMode: 'page',
  showViewConfig: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCompleted(state, action: PayloadAction<FilterState['completed']>) {
      state.completed = action.payload;
    },
    setPriority(state, action: PayloadAction<FilterState['priority']>) {
      state.priority = action.payload;
    },
    setDateGte(state, action: PayloadAction<string | undefined>) {
      state.dateGte = action.payload;
    },
    setDateLte(state, action: PayloadAction<string | undefined>) {
      state.dateLte = action.payload;
    },
    setSort(state, action: PayloadAction<FilterState['sort']>) {
      state.sort = action.payload;
    },
    setOrder(state, action: PayloadAction<FilterState['order']>) {
      state.order = action.payload;
    },
    setViewMode(state, action: PayloadAction<FilterState['viewMode']>) {
      state.viewMode = action.payload;
    },
    setSearchText(state, action: PayloadAction<string | undefined>) {
      state.searchText = action.payload;
    },
    setShowViewConfig(state, action: PayloadAction<boolean>) {
      state.showViewConfig = action.payload;
    },
    toggleViewConfig(state) {
      state.showViewConfig = !state.showViewConfig;
    },
    resetFilter() {
      return initialState;
    },
  },
});

export const {
  setCompleted,
  setPriority,
  setDateGte,
  setDateLte,
  setSort,
  setOrder,
  setViewMode,
  setSearchText,
  setShowViewConfig,
  toggleViewConfig,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
