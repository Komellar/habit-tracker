import { getPaginatedHabits } from '@/data-access/habit-db';

import { HabitItem } from './habit-item';

interface Props {
  allCompletedDates: string[][];
  search?: string;
  page: number;
  limit: number;
}

export const HabitsList = async ({
  allCompletedDates,
  search,
  page,
  limit,
}: Props) => {
  const habits = await getPaginatedHabits(search, page, limit);

  return (
    <>
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
    </>
  );
};
