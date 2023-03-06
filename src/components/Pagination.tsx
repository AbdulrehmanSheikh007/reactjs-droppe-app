import * as React from "react";
import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "../assets/css/Pagination.module.css";

interface props {
    total: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<props> = ({ total, perPage, onPageChange }) => {
    const [pages, setPages] = React.useState<number[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [lastPage, setLastPage] = React.useState<number>(0);

    useEffect(() => {
        const length = Array.from({ length: Math.ceil(total / perPage) }, (_, i) => i + 1);

        setPages(length);
        setLastPage(length[length.length - 1]);
    }, [total, perPage]);

    const handlePrevious = () => {
        if (currentPage === 1) return;

        setCurrentPage(currentPage - 1);
        onPageChange(currentPage - 1);
    }

    const handleCurrent = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    }

    const handleNext = () => {
        if (currentPage === lastPage) return;

        setCurrentPage(currentPage + 1);
        onPageChange(currentPage + 1);
    }

    return (
        <div className={styles['pagination-wrapper']}>
            <div className={styles.pagination}>
                <button disabled={currentPage === 1} onClick={handlePrevious}><FaArrowLeft size={12} /></button>
                {
                    pages.map(page => (
                        <button className={page === currentPage ? styles.active : ''} onClick={() => handleCurrent(page)}>{page}</button>
                    ))
                }
                <button disabled={currentPage === lastPage} onClick={handleNext}><FaArrowRight size={12} /></button>
            </div>
        </div>
    )
};