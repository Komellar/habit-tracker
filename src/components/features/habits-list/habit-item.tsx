'use client';
import Link from 'next/link';
import { useActionState } from 'react';

import { addHabitCompletion } from '@/actions/habits';
import { DeleteHabitButton } from '@/components/features/habit/delete-habit-btn';
import { Button } from '@/components/ui/button';
import { Habit, HabitCompletion } from '@/prisma';
import { BG_COLOR_MAP, COLORS } from '@/utils/colors';
import { last7Days } from '@/utils/dates';

interface Props {
  habit: Habit & { completions: HabitCompletion[] };
}

export const HabitItem = ({ habit }: Props) => {
  const [, addCompletionAction, completionLoading] = useActionState(
    addHabitCompletion,
    null
  );

  const completedDates = habit.completions.map((completion) =>
    completion.date.toISOString().slice(0, 10)
  );

  const isCompletedToday = completedDates.includes(
    new Date().toISOString().slice(0, 10)
  );

  return (
    <div
      key={habit.id}
      className='bg-neutral-900 rounded-xl shadow p-6 relative'
    >
      <div className='flex items-start justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <Link href={`habits/${habit.id}`} className='text-lg font-bold'>
              {habit.title}
            </Link>
            <span
              className={`w-3 h-3 rounded-full`}
              style={{ backgroundColor: COLORS[habit.color] }}
            ></span>
          </div>
          {habit.description && (
            <p className='text-neutral-400 text-sm mt-1'>{habit.description}</p>
          )}
        </div>
        <DeleteHabitButton habitId={habit.id} />
      </div>
      <form action={addCompletionAction.bind(null, habit.id)}>
        {completionLoading ? (
          <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white'></div>
        ) : (
          !isCompletedToday && (
            <Button
              className='mt-4 px-4 py-2 rounded border font-medium transition hover:opacity-75'
              style={{ borderColor: COLORS[habit.color] }}
              type='submit'
            >
              ✓ Mark Done
            </Button>
          )
        )}
      </form>
      <div className='mt-6'>
        <div className='text-xs text-neutral-400 mb-1'>Last 7 days</div>
        <div className='flex gap-1'>
          {last7Days.map((date, i) => {
            const isCompleted = completedDates.includes(
              date.toISOString().slice(0, 10)
            );
            const day = date.getDate();

            return (
              <div
                key={`${habit.id}_${day}`}
                className={`flex-1 h-7 rounded ${i === 6 ? 'border-2 border-white' : ''} ${isCompleted ? BG_COLOR_MAP[habit.color] : 'border-neutral-400 border'}`}
              >
                <span className='flex items-center justify-center h-full text-xs font-semibold'>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
