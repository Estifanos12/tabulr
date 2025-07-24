import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, options: RequestInit = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(url, options);
                if (!response.ok) throw new Error('Error fetching data.');
                const data = await response.json() as T;
                setData(data);
                setLoading(false);
            } catch (error: unknown) {
                setError({ status: true, message: error instanceof Error ? error.message : 'Error fetching data.' });
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { data, loading, error };
}