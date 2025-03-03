import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './style.module.scss';

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
    const [limit] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const listContainerRef = useRef<HTMLDivElement | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const newData = await getData(offset, limit);
        
        if (newData.length < limit) {
            setHasMoreData(false);
        }
        setIsLoading(false);
    }, [offset, limit, getData]);

    useEffect(() => {
        if (offset > 0 && hasMoreData) {
            fetchData();
        }
    }, [fetchData, offset, hasMoreData]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
        if (bottom && !isLoading && hasMoreData) {
            setOffset((prevOffset) => prevOffset + limit);
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
                {loading && items.length === 0 && <div>Loading...</div>}
                {!loading && items.length === 0 && <div>No data available.</div>}
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
            {isLoading && items.length > 0 && <div>Loading more...</div>}
            {!isLoading && (
                <button onClick={scrollToTop}>
                    Scroll to Top
                </button>
            )}
        </div>
    );
};