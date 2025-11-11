// hooks/useSanityData.ts
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

interface UseSanityDataResult<T> {
    data: T[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useSanityData<T>(query: string, params = {}): UseSanityDataResult<T> {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await client.fetch<T[]>(query, params);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query, JSON.stringify(params)]);

    return { data, loading, error, refetch: fetchData };
}