import { useState, useCallback } from 'react';
import { newsMock } from './newsMock';
import { News } from './types';

const PAGE_SIZE = 10;

export const useNews = () => {
  const [news, setNews] = useState<News[]>(newsMock.slice(0, PAGE_SIZE));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(newsMock.slice(0, PAGE_SIZE));
      setPage(1);
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore) return;
    const nextPage = page + 1;
    const nextData = newsMock.slice(0, nextPage * PAGE_SIZE);
     if (nextData.length === news.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      const next = newsMock.slice(0, (page + 1) * PAGE_SIZE);
      setNews(next);
      setPage((p) => p + 1);
      setLoadingMore(false);
    }, 1000);
  }, [page, loadingMore]);

  return { news, refresh, loadMore, refreshing, loadingMore };
};
