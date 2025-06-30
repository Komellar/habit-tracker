import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 bg-gradient-to-b from-neutral-950 to-neutral-900'>
      <div className='max-w-4xl w-full text-center'>
        <div className='mb-12'>
          <div className='inline-block p-2 bg-indigo-900/30 rounded-full mb-6'>
            <svg
              className='w-16 h-16 text-indigo-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
              />
            </svg>
          </div>
          <h1 className='text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
            Habit Tracker
          </h1>
          <p className='text-xl text-neutral-300 mb-8 max-w-lg mx-auto'>
            Build consistency, track progress, and transform your daily routines
            into lasting habits.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/habits'
              className='inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 font-medium shadow-lg shadow-indigo-600/20'
            >
              Get Started
            </Link>
            <Link
              href='/about'
              className='inline-block bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-8 py-4 rounded-lg transition-all border border-neutral-700'
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
          <div className='bg-neutral-800 p-6 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all hover:-translate-y-1'>
            <div className='bg-indigo-600/20 p-3 rounded-lg inline-block mb-4'>
              <svg
                className='w-7 h-7 text-indigo-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-3 text-white'>
              Track Daily Progress
            </h3>
            <p className='text-neutral-300'>
              Monitor your habits with visual indicators showing your daily
              consistency and achievement streaks.
            </p>
          </div>

          <div className='bg-neutral-800 p-6 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all hover:-translate-y-1'>
            <div className='bg-purple-600/20 p-3 rounded-lg inline-block mb-4'>
              <svg
                className='w-7 h-7 text-purple-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-3 text-white'>
              Build Consistency
            </h3>
            <p className='text-neutral-300'>
              Develop lasting habits through consistent daily actions and visual
              motivation that keeps you engaged.
            </p>
          </div>

          <div className='bg-neutral-800 p-6 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all hover:-translate-y-1'>
            <div className='bg-blue-600/20 p-3 rounded-lg inline-block mb-4'>
              <svg
                className='w-7 h-7 text-blue-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-3 text-white'>
              Analyze Trends
            </h3>
            <p className='text-neutral-300'>
              See your progress over time with detailed statistics and insights
              to optimize your habit-building journey.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
