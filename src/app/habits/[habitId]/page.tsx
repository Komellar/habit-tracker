import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { LoaderMedium } from '@/components/common/loader';
import {
  HabitMetadata,
  HabitStatsAndCalendar,
  TopRow,
} from '@/components/features/habit-details';
import { getHabitById } from '@/data-access/habit-db';

interface Props {
  params: Promise<{ habitId: string }>;
}

export default async function HabitDetailPage({ params }: Props) {
  const { habitId } = await params;
  const habit = await getHabitById(habitId);
  if (!habit) return notFound();

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

        <Suspense fallback={<LoaderMedium />}>
          <HabitStatsAndCalendar habitId={habit.id} habit={habit} />
        </Suspense>
      </div>
    </main>
  );
}
