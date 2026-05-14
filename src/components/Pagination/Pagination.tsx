interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
    if (pageCount <= 1) return null;

    return (
        <ul className="pagination">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                <li className={`page-item${page === currentPage ? " active" : ""}`} key={page}>
                    <button type="button" className="page-link" onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
