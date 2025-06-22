import { notFound } from 'next/navigation';

import { CompletionCalendar } from '@/components/features/habit/completion-calendar';
import { getHabitById, getHabitCompletions } from '@/db/habit';

// --- ICONS & COLOR MAPS ---
const ICONS = {
  completions: (
    <svg
      className='w-6 h-6 text-blue-400'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      viewBox='0 0 24 24'
    >
      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3' />
    </svg>
  ),
  success: (
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
  ),
  currentStreak: (
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
  ),
  bestStreak: (
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
  ),
};

const COLOR_MAP = {
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  violet: 'bg-violet-500',
  red: 'bg-red-500',
  cyan: 'bg-cyan-500',
  lime: 'bg-lime-500',
  orange: 'bg-orange-500',
};

interface Props {
  params: { habitId: string };
}

export default async function HabitDetailPage({ params }: Props) {
  const habit = await getHabitById(params.habitId);
  if (!habit) return notFound();

  const completions = await getHabitCompletions(habit.id);
  const completedDates = completions.map((c) => c.date);

  // Mocked stats for demo
  const stats = {
    completions: completions.length,
    successRate: 57,
    currentStreak: 0,
    bestStreak: 8,
  };

  return (
    <main className='min-h-screen bg-neutral-950 text-white px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        {/* Top Row: Icon, Title, Actions */}
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
            <span
              className={`w-7 h-7 rounded-full ${COLOR_MAP[habit.color]} flex items-center justify-center`}
            >
              {/* colored dot */}
            </span>
            <h1 className='text-2xl font-bold'>{habit.title}</h1>
          </div>
          <div className='flex gap-2'>
            <button
              className='p-2 rounded bg-neutral-800 hover:bg-neutral-700 transition'
              title='Edit'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-neutral-300'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.212l-4 1 1-4 12.362-12.725z'
                />
              </svg>
            </button>
            <button
              className='p-2 rounded bg-neutral-800 hover:bg-red-700 transition'
              title='Delete'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-neutral-300'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10'
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Description */}
        {habit.description && (
          <p className='mb-4 text-neutral-400'>{habit.description}</p>
        )}

        {/* Period Filter Buttons */}
        <div className='flex gap-2 mb-4'>
          <button className='px-4 py-1 rounded bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition'>
            7D
          </button>
          <button className='px-4 py-1 rounded bg-white text-neutral-900 font-semibold border border-neutral-700'>
            30D
          </button>
          <button className='px-4 py-1 rounded bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition'>
            90D
          </button>
          <button className='px-4 py-1 rounded bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition'>
            All Time
          </button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 gap-4 mb-8'>
          <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
            {ICONS.completions}
            <span className='text-neutral-400 text-xs mt-2'>Completions</span>
            <span className='text-2xl font-bold'>{stats.completions}</span>
          </div>
          <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
            {ICONS.success}
            <span className='text-green-400 text-xs mt-2'>Success Rate</span>
            <span className='text-2xl font-bold'>{stats.successRate}%</span>
          </div>
          <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
            {ICONS.currentStreak}
            <span className='text-purple-400 text-xs mt-2'>Current Streak</span>
            <span className='text-2xl font-bold'>{stats.currentStreak}</span>
          </div>
          <div className='bg-neutral-900 rounded-lg p-4 flex flex-col items-center shadow border border-neutral-800'>
            {ICONS.bestStreak}
            <span className='text-orange-400 text-xs mt-2'>Best Streak</span>
            <span className='text-2xl font-bold'>{stats.bestStreak}</span>
          </div>
        </div>

        {/* Calendar */}
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
