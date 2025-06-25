import { getHabitCompletions } from '@/db/habitDb';
import { formatDate } from '@/utils/dates';

interface Props {
  completionsLength: number;
  streak: number;
  habitId: string;
}

export const StatsCards = async ({
  completionsLength,
  streak,
  habitId,
}: Props) => {
  const stats = {
    completions: completionsLength,
    successRate: 57,
    currentStreak: streak,
    bestStreak: 8,
  };

  const completions = await getHabitCompletions(habitId);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = formatDate(yesterday);

  // Check if the previous completion was yesterday
  if (completions.length > 1) {
    const previousCompletionDate = completions[completions.length - 2];
    const previousCompletionDateString = formatDate(
      previousCompletionDate.date
    );

    if (previousCompletionDateString !== yesterdayString) {
      stats.currentStreak = 0;
    }
  }

  return (
    <div className='grid grid-cols-2 gap-4 mb-8'>
      <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
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
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3' />
        </svg>
        <span className='text-neutral-400 text-xs mt-2'>Completions</span>
        <span className='text-2xl font-bold'>{stats.completions}</span>
      </div>
      <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
        <svg
          className='w-6 h-6 text-green-400'
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
        <span className='text-green-400 text-xs mt-2'>Success Rate</span>
        <span className='text-2xl font-bold'>{stats.successRate}%</span>
      </div>
      <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
        <svg
          className='w-6 h-6 text-purple-400'
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
        <span className='text-purple-400 text-xs mt-2'>Current Streak</span>
        <span className='text-2xl font-bold'>{stats.currentStreak}</span>
      </div>
      <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
        <svg
          className='w-6 h-6 text-orange-400'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3' />
          <circle cx='12' cy='12' r='10' />
        </svg>
        <span className='text-orange-400 text-xs mt-2'>Best Streak</span>
        <span className='text-2xl font-bold'>{stats.bestStreak}</span>
      </div>
    </div>
  );
};
