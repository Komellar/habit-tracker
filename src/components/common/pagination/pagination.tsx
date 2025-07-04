import {
  Pagination as GroupPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPageLink, getVisiblePages } from '@/utils/pagination';

import { PageSizer } from './page-sizer';
import { PaginationInfo } from './pagination-info';

interface Props {
  page: number;
  search?: string;
  limit: number;
  pageUrl: string;
  totalItems: number;
}

export function Pagination({
  page,
  search,
  limit,
  pageUrl,
  totalItems,
}: Props) {
  const totalPages = Math.ceil(totalItems / limit);
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 my-6'>
      <PaginationInfo limit={limit} page={page} totalItems={totalItems} />
      <div className='flex items-center gap-3'>
        <GroupPagination className='mt-0'>
          <PaginationContent className='gap-1.5'>
            <PaginationItem>
              <PaginationPrevious
                href={getPageLink({
                  pageNumber: page - 1,
                  limit,
                  pageUrl,
                  search,
                })}
                className={`h-9 min-w-9 px-2 flex items-center justify-center rounded-md border transition-all duration-200 ${
                  page > 1
                    ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 text-neutral-300'
                    : 'border-neutral-800 bg-neutral-900/50 text-neutral-600 cursor-not-allowed pointer-events-none'
                }`}
              />
            </PaginationItem>

            {page > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={getPageLink({
                      pageNumber: 1,
                      limit,
                      pageUrl,
                      search,
                    })}
                    className='h-9 min-w-9 px-3 flex items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 text-neutral-300 transition-all duration-200'
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis className='h-9 min-w-9 px-2 flex items-center justify-center text-neutral-400' />
                  </PaginationItem>
                )}
              </>
            )}

            {visiblePages.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={getPageLink({
                    pageNumber: pageNum,
                    limit,
                    pageUrl,
                    search,
                  })}
                  isActive={pageNum === page}
                  className={`h-9 min-w-9 px-3 flex items-center justify-center rounded-md border transition-all duration-200 ${
                    pageNum === page
                      ? 'bg-indigo-600 border-indigo-500 text-white font-medium shadow-md shadow-indigo-900/20'
                      : 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 text-neutral-300'
                  }`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages - 1 && (
              <>
                {page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis className='h-9 min-w-9 px-2 flex items-center justify-center text-neutral-400' />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href={getPageLink({
                      pageNumber: totalPages,
                      limit,
                      pageUrl,
                      search,
                    })}
                    className='h-9 min-w-9 px-3 flex items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 text-neutral-300 transition-all duration-200'
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href={getPageLink({
                  pageNumber: page + 1,
                  limit,
                  pageUrl,
                  search,
                })}
                className={`h-9 min-w-9 px-2 flex items-center justify-center rounded-md border transition-all duration-200 ${
                  page < totalPages
                    ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 text-neutral-300'
                    : 'border-neutral-800 bg-neutral-900/50 text-neutral-600 cursor-not-allowed pointer-events-none'
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </GroupPagination>

        <div className='pl-2 border-l border-neutral-700'>
          <PageSizer search={search} limit={limit} />
        </div>
      </div>
    </div>
  );
}
