import { useState, useMemo } from "react";

interface UseListOptions {
  initialDisplayCount?: number;
  loadMoreIncrement?: number;
  data: any[];
  transformData?: (data: any[]) => any[];
}

export const useList = (options: UseListOptions) => {
    const {
        initialDisplayCount = 10,
        loadMoreIncrement = 10,
        data,
        transformData
    } = options;

    const [displayCount, setDisplayCount] = useState(initialDisplayCount);
    const [searchTerm, setSearchTerm] = useState("");

    // Transform data if needed
    const items = useMemo(() => {
        if (!data) return [];
        if (transformData) return transformData(data);
        return Array.isArray(data) ? data : [];
    }, [data, transformData]);

    // Filter items based on search term
    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return items;
        return items.filter((item: any) => 
            String(item).toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);
    
    const displayedItems = useMemo(() => 
        filteredItems.slice(0, displayCount), 
        [filteredItems, displayCount]
    );
    
    const hasMore = filteredItems.length > displayCount;

    const handleLoadMore = () => {
        setDisplayCount(prev => Math.min(prev + loadMoreIncrement, filteredItems.length));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setDisplayCount(initialDisplayCount);
    };

    return {
        displayedItems,
        hasMore,
        searchTerm,
        handleLoadMore,
        handleSearchChange,
        totalCount: items.length,
        filteredCount: filteredItems.length
    };
}; 