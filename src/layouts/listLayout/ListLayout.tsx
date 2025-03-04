import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './style.module.scss';
import { Loader } from '@components/ui/loader/Loader.tsx'; 
import { LIST_LAYOUT_LIMIT } from './lib/consts.ts';

type Props = {
    items: React.JSX.Element[];
    loading: boolean;
    getData: (offset: number, limit: number) => Promise<Object[]>
}

/**
 * Layout списка
 */
export default function ListLayout({ items, loading, getData }: Props) {
    const [offset, setOffset] = useState(0);
    const [limit] = useState(LIST_LAYOUT_LIMIT);
    const [isLoading, setIsLoading] = useState(loading);
    const [hasMoreData, setHasMoreData] = useState(true);
    const listContainerRef = useRef<HTMLDivElement | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const currentOffset = offset;
        const currentLimit = limit;
        try {
            const newData = await getData(currentOffset, currentLimit);
            
            if (newData.length < currentLimit) {
                setHasMoreData(false);
            } else {
                setOffset(prevOffset => prevOffset + currentLimit);
            }
        } finally {
            setIsLoading(false);
        }
    }, [offset, limit, getData]);

    useEffect(() => {
        if (offset > 0 && hasMoreData) {
            fetchData();
        }
    }, [fetchData, offset, hasMoreData]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const bottom = target.scrollHeight <= target.scrollTop + target.clientHeight;
        if (bottom && !isLoading && hasMoreData) {
            fetchData();
        }
    };

    const scrollToTop = () => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <div ref={listContainerRef} onScroll={handleScroll} className={styles.listLayout}>
                {isLoading && items.length === 0 && 
                    <Loader/>
                }
                {!isLoading && items.length === 0 && <div>No data available.</div>}
                {items.length > 0 && !loading && (
                    <div>
                        {items.map((item, index) =>  (
                            <div key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isLoading && items.length > 0 && 
                <Loader/>
            }
            {!hasMoreData && (
                <button onClick={scrollToTop}>
                    Scroll to Top
                </button>
            )}
        </div>
    );
};