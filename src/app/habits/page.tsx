import Link from 'next/link';

import {
  HabitsContainer,
  InfoBanner,
  SearchInput,
  StatsCards,
} from '@/components/features/habits-list';
import { getHabits } from '@/data-access/habit-db';
import { PaginationUrlParams } from '@/models/pagination';
import {
  getAllCompletedDays,
  getCompletedToday,
} from '@/utils/completed-dates';
import { convertPaginationParams } from '@/utils/pagination';

export default async function HabitsPage({
  searchParams,
}: {
  searchParams: Promise<PaginationUrlParams>;
}) {
  const params = await searchParams;
  const { limit, page, search } = convertPaginationParams(params);

  const habits = await getHabits();
  const totalHabits = habits.length;

  const allCompletedDates = getAllCompletedDays(habits);
  const doneToday = getCompletedToday(allCompletedDates);

  return (
    <main className='min-h-[calc(100vh-65px)] bg-neutral-950 text-white px-4 py-8 relative'>
      <InfoBanner totalHabits={totalHabits} doneToday={doneToday} />
      <StatsCards doneToday={doneToday} habits={habits} />
      <section>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Your Habits</h2>
          <SearchInput search={search} limit={limit} />
          <Link
            href='/habits/create'
            className='sm:mt-0 flex items-center gap-2 bg-white text-neutral-900 font-medium px-5 py-2 rounded-lg shadow hover:bg-neutral-100 transition whitespace-nowrap'
          >
            <span className='text-xl'>+</span> Add Habit
          </Link>
        </div>

        <HabitsContainer
          allCompletedDates={allCompletedDates}
          limit={limit}
          page={page}
          search={search}
        />
      </section>
    </main>
  );
}
