/**
 * v0 by Vercel.
 * @see https://v0.dev/t/o59Vu46jY2f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"

import DiscogResponse from "@/types/DiscogResponse";
import DiscogRecord from "@/types/DiscogRecord";

const CollectionPage: React.FC<DiscogResponse> = ({pagination, releases}) => {
  let currentPage = pagination.page

  // cover_image: string;
  // id: number;
  // thumb: string;
  // year: number;
  // title: string;
  // genres: string[];
  // styles: string[];
  // artists: Artist[];
  // master_url: string;
  // resource_url: string;
  // formats: Formats[];

  const products = releases.map(({ basic_information }: DiscogRecord) => ({
    coverImage: basic_information.cover_image,
    id: basic_information.id,
    thumb: basic_information.thumb,
    year: basic_information.year,
    title: basic_information.title,
    genres: basic_information.genres.join(', '),
    artist: basic_information.artists.map((artist: any) => artist.name).join(', '),
    styles: basic_information.styles.join(', '),
    masterUrl: basic_information.master_url,
    resourceUrl: basic_information.resource_url,
    formats: basic_information.formats.map((format: any) => format.name).join(', '),
  }));

  // interface Formats {
  //   descriptions: string[];
  //   name: string;
  //   qty: string;
  //   text: string;
  // }

  const totalPages = pagination.pages

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">

            <div className="flex flex-col h-full">
              <div className="relative w-full flex-grow">
                <Link href={`/record/${product.id}`}>
                    <Image
                      src={`${product.coverImage || '/placeholder.svg'}`}
                      alt={product.artist}
                      width={640}
                      height={640}
                      objectFit="cover"
                      className="rounded-sm"
                      priority
                    />
                </Link>
              </div>

              <div className="p-3">
                <h3 className="text-lg font-semibold">{product.artist}</h3>
                <h3 className="text-lg font-semibold">{product.id}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.title}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.year}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.styles}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.masterUrl}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.resourceUrl}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.genres}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.formats}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/collection/1?page=${currentPage - 1}`}
                isActive={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/collection/1?page=${pageNumber}`}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`/collection/1?page=${currentPage + 1}`}
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
