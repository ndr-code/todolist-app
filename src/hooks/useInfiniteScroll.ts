'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  initialLoad: number;
  loadIncrement: number;
  enabled: boolean;
}

interface UseInfiniteScrollReturn<T> {
  visibleItems: T[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  reset: () => void;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll<T>({
  items,
  initialLoad = 10,
  loadIncrement = 5,
  enabled = true,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [visibleCount, setVisibleCount] = useState(initialLoad);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || !enabled) return;

    setIsLoadingMore(true);

    // Simulate loading delay untuk UX yang lebih baik
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + loadIncrement, items.length));
      setIsLoadingMore(false);
    }, 500);
  }, [hasMore, isLoadingMore, enabled, loadIncrement, items.length]);

  const reset = useCallback(() => {
    setVisibleCount(initialLoad);
    setIsLoadingMore(false);
  }, [initialLoad]);

  // Setup intersection observer untuk auto-load ketika scroll mendekati bottom
  useEffect(() => {
    if (!enabled || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Load 100px before reaching the sentinel
      }
    );

    observerRef.current = observer;

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, hasMore, isLoadingMore, loadMore]);

  // Reset ketika items berubah
  useEffect(() => {
    reset();
  }, [items, reset]);

  // Reset ketika mode berubah
  useEffect(() => {
    if (enabled) {
      reset();
    }
  }, [enabled, reset]);

  return {
    visibleItems,
    hasMore,
    isLoadingMore,
    loadMore,
    reset,
    sentinelRef,
  };
}

// Hook untuk mendapatkan ref sentinel yang bisa digunakan di komponen
export function useScrollSentinel() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  return sentinelRef;
}
