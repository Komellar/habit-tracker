import { notFound } from 'next/navigation';

import {
  CompletionCalendar,
  HabitMetadata,
  StatsCards,
  TopRow,
} from '@/components/features/habit-details';
import { getHabitCompletions } from '@/data-access/habit-completion-db';
import { getHabitById } from '@/data-access/habit-db';

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
    <main className='min-h-[calc(100vh-65px)] bg-neutral-950 text-white px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <TopRow habitId={habit.id} title={habit.title} color={habit.color} />
        <HabitMetadata
          color={habit.color}
          createdAt={habit.createdAt}
          description={habit.description}
          goal={habit.goal}
        />
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
      </div>
    </main>
  );
}
