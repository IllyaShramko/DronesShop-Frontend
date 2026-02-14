import styles from "./pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    const maxVisible = 7;
    let startPage = currentPage - 3;
    let endPage = currentPage + 3;

    if (startPage < 1) {
        startPage = 1;
        endPage = maxVisible;
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisible + 1;
    }

    const visiblePages: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
        if (i > 0) {
            visiblePages.push(i);
        }
    }

    return (
        <div className={styles.pagination}>
            {currentPage > 1 && (
                <button className={styles.pageButton} onClick={() => onPageChange(1)}>⏮</button>
            )}

            {visiblePages.map((page) => (
                <button
                    key={page}
                    className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`} onClick={() => onPageChange(page)}>{page}</button>
            ))}

            {currentPage < totalPages && (
                <button className={styles.pageButton}onClick={() => onPageChange(totalPages)}>⏭</button>
            )}
        </div>
    );
}