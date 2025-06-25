import { notFound } from 'next/navigation';

import { CompletionCalendar } from '@/components/features/habit-details/completion-calendar';
import { StatsCards } from '@/components/features/habit-details/stats-cards';
import { TopRow } from '@/components/features/habit-details/top-row';
import { getHabitById, getHabitCompletions } from '@/db/habitDb';

interface Props {
  params: Promise<{ habitId: string }>;
}

export default async function HabitDetailPage({ params }: Props) {
  const { habitId } = await params;
  const habit = await getHabitById(habitId);
  if (!habit) return notFound();

  const completions = await getHabitCompletions(habit.id);
  const completedDates = completions.map((c) => c.date);

  return (
    <main className='min-h-screen bg-neutral-950 text-white px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <TopRow habitId={habit.id} title={habit.title} color={habit.color} />
        {habit.description && (
          <p className='mb-4 text-neutral-400'>{habit.description}</p>
        )}
        <StatsCards
          completionsLength={completions.length}
          streak={habit.streak}
          habitId={habit.id}
        />
        <div className='bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow'>
          <CompletionCalendar
            completedDates={completedDates}
            habitColor={habit.color}
          />
        </div>
      </div>
    </main>
  );
}
