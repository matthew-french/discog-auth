/**
 * v0 by Vercel.
 * @see https://v0.dev/t/o59Vu46jY2f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import RecordComponent from '@/components/record-component';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"

import DiscogResponse from "@/types/DiscogResponse";
import { DiscogRecord, BasicInformation} from "@/types/DiscogRecord";

type Product = {
  coverImage: string;
  id: number;
  thumb: string;
  year: number;
  title: string;
  genres: string;
  artist: string;
  styles: string;
  masterUrl: string;
  resourceUrl: string;
  formats: string;
};

const CollectionPage: React.FC<DiscogResponse> = ({pagination, releases}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const currentPage = pagination.page;
  const totalPages = pagination.pages;

  useEffect(() => {
    // Convert releases to the desired format for products
    const newProducts = releases.map(({ basic_information }: DiscogRecord) => ({
      coverImage: basic_information.cover_image,
      id: basic_information.id,
      thumb: basic_information.thumb,
      year: basic_information.year,
      title: basic_information.title,
      genres: basic_information.genres.join(', '),
      artist: basic_information.artists.map(artist => artist.name).join(', '),
      styles: basic_information.styles.join(', '),
      masterUrl: basic_information.master_url,
      resourceUrl: basic_information.resource_url,
      formats: basic_information.formats.map(format => format.name).join(', '),
    }));

    setProducts(newProducts); // Update the state with the new products
    console.log('Updated Products Length', newProducts.length);
  }, [currentPage, releases]); // Depend on currentPage and releases to trigger the effect

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <RecordComponent key={`${product.id}-${index}`} {...product} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/collection/1?page=${currentPage - 1}&perPage=24&sort=artist&sortOrder=asc`}
                isActive={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/collection/1?page=${pageNumber}&perPage=24&sort=artist&sortOrder=asc`}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`/collection/1?page=${currentPage + 1}&perPage=24&sort=artist&sortOrder=asc`}
                isActive={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default CollectionPage
