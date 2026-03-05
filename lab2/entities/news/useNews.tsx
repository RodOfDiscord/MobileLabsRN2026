import { useState, useCallback, useRef } from 'react';
import { newsMock } from './newsMock';
import { News } from './types';

const PAGE_SIZE = 10;

export const useNews = () => {
  const [news, setNews] = useState<News[]>(newsMock.slice(0, PAGE_SIZE));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  
  const isLoadingRef = useRef(false);
  
  const refresh = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setRefreshing(true);
    setTimeout(() => {
      setNews(newsMock.slice(0, PAGE_SIZE));
      setPage(1);
      setRefreshing(false);
      isLoadingRef.current = false;
    }, 1500);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    
    setPage((currentPage) => {
      const nextPage = currentPage + 1;
      const nextData = newsMock.slice(0, nextPage * PAGE_SIZE);
      if (nextData.length <= news.length) return currentPage;

      isLoadingRef.current = true;
      setLoadingMore(true);
      setTimeout(() => {
        setNews(nextData);
        setLoadingMore(false);
        isLoadingRef.current = false;
      }, 1000);

      return nextPage;
    });
  }, [news.length]);

  return { news, refresh, loadMore, refreshing, loadingMore };
};