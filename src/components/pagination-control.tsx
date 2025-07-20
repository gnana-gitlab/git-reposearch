"use client";

import type { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  perPage: number;
}

export const PaginationControl: FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium text-foreground px-2">
          Page {currentPage} of {totalPages.toLocaleString()}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
