import React from "react";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "../ui/pagination";

interface PaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  render: (pageData: T[]) => React.ReactNode;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  hidePagination?: boolean;
}

export default function Pagination<T>({
  data,
  itemsPerPage,
  render,
  totalPages: externalTotalPages,
  currentPage: externalCurrentPage,
  onPageChange,
  hidePagination = false,
}: PaginationProps<T>) {
  const [internalCurrentPage, setInternalCurrentPage] = React.useState(1);

  const currentPage = externalCurrentPage ?? internalCurrentPage;

  const calculatedTotalPages = Math.ceil(data.length / itemsPerPage);
  const totalPages = externalTotalPages ?? calculatedTotalPages;

  const getCurrentPageData = () => {
    if (externalTotalPages !== undefined) {
      return data;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalCurrentPage(newPage);
    }
  };

  function getPaginationRange(current: number, total: number) {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (current >= total - 2) {
      return [total - 4, total - 3, total - 2, total - 1, total];
    }

    return [current - 2, current - 1, current, current + 1, current + 2];
  }

  return (
    <div className="flex flex-col gap-2">
      {render(getCurrentPageData())}
      {totalPages > 1 && !hidePagination && (
        <ShadcnPagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {getPaginationRange(currentPage, totalPages).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      )}
    </div>
  );
}
