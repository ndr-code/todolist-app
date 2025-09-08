'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchText } from '@/store/slices/filterSlice';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchText(searchQuery.trim() || undefined));
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    handleSearchChange,
    clearSearch,
  };
}
