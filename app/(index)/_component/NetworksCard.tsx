import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Network as NetworkType } from "@/types/response";
import { TokenIcon } from "@web3icons/react";
import { Globe } from "lucide-react";

interface NetworksCardProps {
  networks: NetworkType[];
  currentPage: number;
  totalPages: number;
  getPaginationRange: (current: number, total: number) => (number | string)[];
  setCurrentPage: (page: number) => void;
  networksPerPage: number;
}

export default function NetworksCard({
  networks,
  currentPage,
  totalPages,
  getPaginationRange,
  setCurrentPage,
  networksPerPage,
}: NetworksCardProps) {
  const getCurrentNetworks = () => {
    const startIndex = (currentPage - 1) * networksPerPage;
    const endIndex = startIndex + networksPerPage;
    return networks.slice(startIndex, endIndex);
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Supported Networks ({networks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {getCurrentNetworks().map((network) => (
            <div
              key={network.id}
              className="hover:bg-accent hover:border-accent-foreground/20 group flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-colors"
            >
              <div className="h-6 w-6">
                <TokenIcon
                  symbol={network.symbol.toLowerCase()}
                  variant="branded"
                  size="24"
                  allowReorder="yes"
                />
              </div>
              <div className="text-muted-foreground text-center text-sm font-medium">
                {network.name}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full overflow-x-auto">
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className="whitespace-nowrap">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                        onClick={() => setCurrentPage(page)}
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
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
