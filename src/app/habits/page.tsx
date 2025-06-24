import Link from 'next/link';

import { HabitItem } from '@/components/features/habitsList/habit-item';
import { InfoBanner } from '@/components/features/habitsList/info-banner';
import { StatsCards } from '@/components/features/habitsList/stats-cards';
import { getHabits } from '@/db/habit';

export default async function HabitsPage() {
  const habits = await getHabits();
  const totalHabits = habits.length;
  const doneToday = 2;

  return (
    <main className='min-h-screen bg-neutral-950 text-white px-4 py-8 relative'>
      <InfoBanner totalHabits={totalHabits} doneToday={doneToday} />
      <StatsCards totalHabits={totalHabits} doneToday={doneToday} />
      <section>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Your Habits</h2>
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
            habits.map((habit) => <HabitItem habit={habit} key={habit.id} />)
          )}
        </div>
      </section>
    </main>
  );
}
