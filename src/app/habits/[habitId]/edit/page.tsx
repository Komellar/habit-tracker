import { redirect } from 'next/navigation';

import { CreateEditHabitForm } from '@/components/features/habit';
import { Button } from '@/components/ui/button';
import { getHabitById } from '@/db/habitDb';

interface Props {
  params: Promise<{
    habitId: string;
  }>;
}

export default async function EditHabitPage({ params }: Props) {
  const { habitId } = await params;

  const habit = await getHabitById(habitId);

  if (!habit) {
    return (
      <main className='min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-400 mb-4'>
            Habit not found
          </h1>
          <Button
            onClick={() => redirect('/habits')}
            className='bg-indigo-600 hover:bg-indigo-500'
          >
            Back to Habits
          </Button>
        </div>
      </main>
    );
  }

  return <CreateEditHabitForm habit={habit} />;
}
