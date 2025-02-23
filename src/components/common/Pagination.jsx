import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
    const maxPageNumbersToShow = 3; // Adjust as needed

    const getPageNumbers = () => {
        let pages = [];
        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 2) {
                pages = [1, 2, 3, "...", totalPages];
            } else if (currentPage >= totalPages - 1) {
                pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            {/* Previous Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                <Button
                    key={index}
                    variant={page === currentPage ? "default" : "outline"}
                    size="icon"
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                >
                    {page}
                </Button>
            ))}

            {/* Next Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default PaginationComponent;
