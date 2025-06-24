import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

/**
 * Props for the Pagination component.
 * 
 * @property totalPages - Total number of pages available (must be ≥ 1).
 * @property setPage - Callback function to set the current page (1-based index).
 * @property currentPage - Currently active page (1-based index).
 * @property pageRangeDisplayed - Number of page buttons to show in the middle (default: 5).
 * @property marginPagesDisplayed - Number of page buttons to show at the beginning and end (default: 1).
 * @property containerClassName - Optional custom CSS class for pagination container.
 * @property activeClassName - Optional custom CSS class for the active page.
 * @property nextLabel - Optional label for the "next" button (default: "→").
 * @property previousLabel - Optional label for the "previous" button (default: "←").
 */
interface PaginationProps {
  totalPages: number;
  setPage: (page: number) => void;
  currentPage: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  containerClassName?: string;
  activeClassName?: string;
  nextLabel?: string;
  previousLabel?: string;
}

export default function Pagination({
  totalPages,
  setPage,
  currentPage,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
  containerClassName,
  activeClassName,
  nextLabel,
  previousLabel,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

  return (
    <ReactPaginate
      pageCount={safeTotalPages}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={safeCurrentPage - 1}
      containerClassName={containerClassName || css.pagination}
      activeClassName={activeClassName || css.active}
      nextLabel={nextLabel || "→"}
      previousLabel={previousLabel || "←"}
    />
  );
}
