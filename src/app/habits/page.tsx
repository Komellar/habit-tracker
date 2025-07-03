import Form from 'next/form';
import Link from 'next/link';

import {
  HabitItem,
  InfoBanner,
  StatsCards,
} from '@/components/features/habits-list';
import { getHabits } from '@/db/habit-db';
import {
  getAllCompletedDays,
  getCompletedToday,
} from '@/utils/completed-dates';

export default async function HabitsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const habits = await getHabits(query);
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
          <Form action='/habits' className='flex-1 max-w-md'>
            <div className='relative flex-1'>
              <input
                name='query'
                className='w-full px-4 py-2 pl-10 pr-12 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition-colors'
                placeholder='Search habits'
                defaultValue={query || ''}
              />
              <svg
                className='absolute left-3 top-2.5 h-5 w-5 text-neutral-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <button
                type='submit'
                className='absolute right-2 top-1.5 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors'
                aria-label='Search'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='h-4 w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </Form>
          <Link
            href='/habits/create'
            className='sm:mt-0 flex items-center gap-2 bg-white text-neutral-900 font-medium px-5 py-2 rounded-lg shadow hover:bg-neutral-100 transition whitespace-nowrap'
          >
            <span className='text-xl'>+</span> Add Habit
          </Link>
        </div>
        <div className='space-y-6'>
          {habits.length === 0 ? (
            <p className='text-neutral-400 text-center'>No habits found.</p>
          ) : (
            habits.map((habit, i) => (
              <HabitItem
                habit={habit}
                key={habit.id}
                completedDates={allCompletedDates[i]}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
