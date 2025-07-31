import { Habit, HabitCompletion } from '@/prisma';
import { getSuccessRate } from '@/utils/habit-details/stats';

interface Props {
  doneToday: number;
  habits: (Habit & { completions: HabitCompletion[] })[];
}

export const StatsCards = ({ doneToday, habits }: Props) => {
  const totalSuccessRate = habits.length
    ? Math.floor(
        habits
          .map((habit) => getSuccessRate(habit.createdAt, habit.completions))
          .reduce((sum, rate) => sum + rate, 0) / habits.length
      )
    : 0;

  const totalStreaks = habits.reduce(
    (sum, habit) => sum + (habit.streak || 0),
    0
  );

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4'>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1'>
        <div
          data-testid='stats-total'
          className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'
        >
          <span className='mb-2'>
            <svg
              className='w-6 h-6 text-blue-400'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <circle
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 8v4l3 3'
              />
            </svg>
          </span>
          <span className='text-neutral-400 text-xs mb-1'>Total Habits</span>
          <span className='text-2xl font-bold'>{habits.length}</span>
        </div>
        <div
          data-testid='stats-today'
          className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'
        >
          <span className='mb-2'>
            <svg
              className='w-6 h-6 text-green-400'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <rect x='3' y='4' width='18' height='18' rx='2' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16 2v4M8 2v4M3 10h18'
              />
            </svg>
          </span>
          <span className='text-green-400 text-xs mb-1'>Done Today</span>
          <span className='text-2xl font-bold'>{doneToday}</span>
        </div>
        <div
          data-testid='stats-rate'
          className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'
        >
          <span className='mb-2'>
            <svg
              className='w-6 h-6 text-purple-400'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2'
              />
              <circle cx='12' cy='7' r='4' />
            </svg>
          </span>
          <span className='text-purple-400 text-xs mb-1'>Success Rate</span>
          <span className='text-2xl font-bold'>{totalSuccessRate}%</span>
        </div>
        <div
          data-testid='stats-streaks'
          className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'
        >
          <span className='mb-2'>
            <svg
              className='w-6 h-6 text-orange-400'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 8v4l3 3'
              />
              <circle cx='12' cy='12' r='10' />
            </svg>
          </span>
          <span className='text-orange-400 text-xs mb-1'>Total Streaks</span>
          <span className='text-2xl font-bold'>{totalStreaks}</span>
        </div>
      </div>
    </div>
  );
};
