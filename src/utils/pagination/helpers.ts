import { PaginationParams, PaginationUrlParams } from '@/models/pagination';

export const getPageLink = ({
  pageNumber,
  pageUrl,
  limit,
  search,
}: {
  pageNumber: number;
  pageUrl: string;
  limit: number;
  search?: string;
}) => {
  const url = pageUrl.startsWith('/') ? pageUrl.substring(1) : pageUrl;
  if (!search) {
    return `/${url}?page=${pageNumber}&limit=${limit}`;
  }
  return `/${url}?page=${pageNumber}&limit=${limit}&search=${search}`;
};

export const getVisiblePages = (page: number, totalPages: number) => {
  const pages = [];

  pages.push(page);

  if (page > 1) {
    pages.unshift(page - 1);
  }

  if (page < totalPages) {
    pages.push(page + 1);
  }

  return pages;
};

export const convertPaginationParams = (
  params: PaginationUrlParams
): PaginationParams => {
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;
  const limit = params.limit ? parseInt(params.limit) : 5;

  return { page, limit, search };
};
