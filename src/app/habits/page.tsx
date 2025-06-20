import Link from 'next/link';

import { getHabits } from '@/db/habit';

export default async function HabitsPage() {
  const habits = await getHabits();

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8'>
        <h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
          Your Habits
        </h1>
        <div className='space-y-4'>
          {habits.length === 0 ? (
            <p className='text-gray-500 text-center'>No habits found.</p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className='p-4 bg-gray-50 rounded-lg shadow-sm'
              >
                <h2 className='text-lg font-semibold text-indigo-600'>
                  {habit.title}
                </h2>
                {habit.description && (
                  <p className='text-gray-600'>{habit.description}</p>
                )}
                {habit.goal && (
                  <p className='text-gray-500'>Goal: {habit.goal}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Link
        href='/habits/create'
        className='group fixed bottom-8 right-8 z-50'
        aria-label='Add new habit'
      >
        <div className='relative flex items-center'>
          <span className='absolute right-21 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none bg-indigo-700 text-white text-sm rounded-lg px-4 py-2 shadow-lg transition-all ease-in duration-500 whitespace-nowrap scale-95 group-hover:scale-100'>
            Add new habit
            <span className='absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-700 rotate-45 rounded-sm ml-1'></span>
          </span>
          <span className='w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-xl hover:scale-110 transition-transform duration-200  border-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-8 h-8 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4v16m8-8H4'
              />
            </svg>
          </span>
        </div>
      </Link>
    </main>
  );
}
