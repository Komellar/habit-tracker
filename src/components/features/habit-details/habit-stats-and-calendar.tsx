import { getHabitCompletions } from '@/data-access/habit-completion-db';
import { getHabitById } from '@/data-access/habit-db';

import { CompletionCalendar } from './completion-calendar';
import { StatsCards } from './stats-cards';

interface Props {
  habitId: string;
  habit: NonNullable<Awaited<ReturnType<typeof getHabitById>>>;
}

export async function HabitStatsAndCalendar({ habitId, habit }: Props) {
  const completions = await getHabitCompletions(habitId);
  const completedDates = completions.map((c) => c.date);

  return (
    <>
      <StatsCards completions={completions} habit={habit} />
      <div className='bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-lg mt-6'>
        <h2 className='text-lg font-medium mb-4 text-neutral-200'>
          Completion Calendar
        </h2>
        <CompletionCalendar
          completedDates={completedDates}
          habitColor={habit.color}
        />
      </div>
    </>
  );
}
