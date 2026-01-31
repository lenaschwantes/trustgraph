/*
 * Custom hook for managing graph data from API
 */

import { useState, useEffect } from 'react';
import { api, GraphData } from '@/lib/api';

interface UseGraphDataResult {
  data: GraphData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGraphData(): UseGraphDataResult {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const graphData = await api.getGraph();
      setData(graphData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load graph data';
      setError(errorMessage);
      console.error('Graph data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
