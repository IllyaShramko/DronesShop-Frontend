import { PaginationProps } from "./paggination.types";
import styles from "./pagination.module.css";

export function Pagination(props: PaginationProps) {

    const {currentPage, totalPages, onPageChange, goHead} = props

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
        startPage = Math.max(1, totalPages - maxVisible + 1);
    }

    const visiblePages: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => {
                    onPageChange(1)
                    goHead()
                }}
                disabled={currentPage === 1}
            >
                ⏮
            </button>

            {visiblePages.map((page) => (
                <button
                    key={page}
                    className={`${styles.pageButton} ${
                        page === currentPage ? styles.active : ""
                    }`}
                    onClick={() => {
                        onPageChange(page)
                        goHead()
                    }}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles.pageButton}
                onClick={() => {
                    onPageChange(totalPages)
                    goHead()
                }}
                disabled={currentPage === totalPages}
            >
                ⏭
            </button>
        </div>
    );
}