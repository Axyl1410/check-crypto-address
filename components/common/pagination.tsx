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
}

export default function Pagination<T>({
  data,
  itemsPerPage,
  render,
  totalPages: externalTotalPages,
  currentPage: externalCurrentPage,
  onPageChange,
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
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current === 1) {
      return [1, 2, total];
    }
    if (current === total) {
      return [1, total - 1, total];
    }
    return [1, current, total];
  }

  return (
    <div>
      {render(getCurrentPageData())}
      {totalPages > 1 && (
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
            {getPaginationRange(currentPage, totalPages).map((page, idx) =>
              typeof page === "number" ? (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <span className="text-muted-foreground px-2 select-none">
                    ...
                  </span>
                </PaginationItem>
              ),
            )}
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
