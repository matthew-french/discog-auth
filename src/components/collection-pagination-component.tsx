import React from 'react';

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  basePath: string;
}

const CollectionPaginationcomponent: React.FC<PaginationProps> = ({ currentPage, totalPages, perPage, basePath }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${basePath}?page=${Math.max(1, currentPage - 1)}&perPage=${perPage}&sort=artist&sortOrder=asc`}
            disabled={currentPage === 1}
            isActive={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={`${basePath}?page=${pageNumber}&perPage=${perPage}&sort=artist&sortOrder=asc`}
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}&perPage=${perPage}&sort=artist&sortOrder=asc`}
            disabled={currentPage === totalPages}
            isActive={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CollectionPaginationcomponent;
