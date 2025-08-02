import { Suspense } from 'react';

import { LoaderMedium } from '@/components/common/loader';
import { Pagination } from '@/components/common/pagination';
import { getHabitsCount } from '@/data-access/habit-db';

import { HabitsList } from './habits-list';

interface Props {
  allCompletedDates: string[][];
  search?: string;
  page: number;
  limit: number;
}

export const HabitsContainer = async ({
  allCompletedDates,
  search,
  page,
  limit,
}: Props) => {
  const habitsCount = await getHabitsCount(search);
  const requestKey = `${page}-${limit}-${search}`;

  return (
    <>
      <Suspense key={requestKey} fallback={<LoaderMedium />}>
        <HabitsList
          allCompletedDates={allCompletedDates}
          search={search}
          page={page}
          limit={limit}
        />
      </Suspense>
      <Pagination
        pageUrl='/habits'
        search={search}
        page={page}
        limit={limit}
        totalItems={habitsCount}
      />
    </>
  );
};
