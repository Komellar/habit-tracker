import Link from 'next/link';

export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className='min-h-[calc(100vh-65px)] bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 py-16'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Section */}
        <div className='mb-16 text-center'>
          <div className='inline-block p-3 bg-indigo-900/30 rounded-full mb-6'>
            <svg
              className='w-12 h-12 text-indigo-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h1 className='text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'>
            About Habit Tracker
          </h1>
          <p className='text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed'>
            Your personal companion for building better habits and achieving
            your goals through consistent daily action.
          </p>
        </div>

        {/* Mission Statement */}
        <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-10 mb-12 border border-indigo-500/20 shadow-lg shadow-indigo-500/5'>
          <h2 className='text-3xl font-bold mb-6 text-white'>Our Mission</h2>
          <p className='text-neutral-200 mb-6 leading-relaxed text-lg'>
            Habit Tracker was created with a simple mission: to help people
            build positive habits that stick. We believe that consistent small
            actions lead to remarkable results over time.
          </p>
          <p className='text-neutral-300 leading-relaxed'>
            Whether you&apos;re trying to exercise more, read daily, practice a
            skill, or develop any other positive routine, Habit Tracker gives
            you the visual feedback and accountability you need to stay on track
            and celebrate your progress.
          </p>
        </div>

        {/* Two Column Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
          <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 border border-indigo-500/20 shadow-lg shadow-indigo-500/5 transform transition-all hover:-translate-y-1 hover:shadow-indigo-500/10'>
            <h2 className='text-2xl font-bold mb-6 text-white flex items-center'>
              <span className='bg-indigo-600/30 p-3 rounded-lg mr-4 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-indigo-400'
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
              </span>
              How It Works
            </h2>
            <ol className='text-neutral-200 space-y-4 ml-2'>
              <li className='flex items-center'>
                <span className='bg-indigo-600/20 w-8 h-8 rounded-full flex items-center justify-center text-indigo-300 font-bold mr-3'>
                  1
                </span>
                <span>Create habits you want to track</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-indigo-600/20 w-8 h-8 rounded-full flex items-center justify-center text-indigo-300 font-bold mr-3'>
                  2
                </span>
                <span>Mark them as complete each day</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-indigo-600/20 w-8 h-8 rounded-full flex items-center justify-center text-indigo-300 font-bold mr-3'>
                  3
                </span>
                <span>Visualize your progress with our tracking system</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-indigo-600/20 w-8 h-8 rounded-full flex items-center justify-center text-indigo-300 font-bold mr-3'>
                  4
                </span>
                <span>Build streaks and maintain consistency</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-indigo-600/20 w-8 h-8 rounded-full flex items-center justify-center text-indigo-300 font-bold mr-3'>
                  5
                </span>
                <span>Analyze your patterns to optimize your routine</span>
              </li>
            </ol>
          </div>

          <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 border border-purple-500/20 shadow-lg shadow-purple-500/5 transform transition-all hover:-translate-y-1 hover:shadow-purple-500/10'>
            <h2 className='text-2xl font-bold mb-6 text-white flex items-center'>
              <span className='bg-purple-600/30 p-3 rounded-lg mr-4 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-purple-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
              </span>
              Key Benefits
            </h2>
            <ul className='text-neutral-200 space-y-4'>
              <li className='flex items-center'>
                <span className='bg-green-600/20 w-8 h-8 rounded-full flex items-center justify-center text-green-400 mr-3'>
                  ✓
                </span>
                <span>Visual progress tracking that motivates</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-green-600/20 w-8 h-8 rounded-full flex items-center justify-center text-green-400 mr-3'>
                  ✓
                </span>
                <span>Simple, distraction-free interface</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-green-600/20 w-8 h-8 rounded-full flex items-center justify-center text-green-400 mr-3'>
                  ✓
                </span>
                <span>Customizable habits with color coding</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-green-600/20 w-8 h-8 rounded-full flex items-center justify-center text-green-400 mr-3'>
                  ✓
                </span>
                <span>Streak counting to build momentum</span>
              </li>
              <li className='flex items-center'>
                <span className='bg-green-600/20 w-8 h-8 rounded-full flex items-center justify-center text-green-400 mr-3'>
                  ✓
                </span>
                <span>Insightful statistics to measure growth</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-10 mb-16 border border-blue-500/20 shadow-lg shadow-blue-500/5'>
          <h2 className='text-3xl font-bold mb-8 text-white'>
            Frequently Asked Questions
          </h2>

          <div className='space-y-8'>
            <div className='bg-neutral-800/50 p-6 rounded-xl border border-neutral-700/50'>
              <h3 className='text-xl font-bold mb-3 text-indigo-300'>
                How many habits can I track?
              </h3>
              <p className='text-neutral-200 leading-relaxed'>
                You can track as many habits as you&apos;d like. However, we
                recommend focusing on 3-5 key habits at a time for the best
                results and to avoid feeling overwhelmed.
              </p>
            </div>

            <div className='bg-neutral-800/50 p-6 rounded-xl border border-neutral-700/50'>
              <h3 className='text-xl font-bold mb-3 text-indigo-300'>
                Can I set reminders for my habits?
              </h3>
              <p className='text-neutral-200 leading-relaxed'>
                Currently, we don&apos;t have built-in reminders, but this
                feature is on our roadmap for future updates. We&apos;re working
                to make habit building even more seamless.
              </p>
            </div>

            <div className='bg-neutral-800/50 p-6 rounded-xl border border-neutral-700/50'>
              <h3 className='text-xl font-bold mb-3 text-indigo-300'>
                Is my data private?
              </h3>
              <p className='text-neutral-200 leading-relaxed'>
                Yes, your habit data is completely private and stored securely.
                We don&apos;t share your personal information with third
                parties. Your journey is yours alone.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-10 border border-indigo-500/30'>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Ready to build better habits?
          </h2>
          <p className='text-neutral-300 mb-8 max-w-lg mx-auto'>
            Start your journey to better habits today. It only takes a few
            seconds to begin tracking your first habit.
          </p>
          <Link
            href='/habits'
            className='inline-block bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-10 py-4 rounded-xl transition-all transform hover:scale-105 font-medium shadow-lg shadow-indigo-600/30 text-lg'
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </main>
  );
}
