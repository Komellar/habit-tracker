interface Props {
  totalHabits: number;
  doneToday: number;
}

export const InfoBanner = ({ totalHabits, doneToday }: Props) => {
  if (totalHabits > 0 && doneToday === totalHabits) {
    return (
      <div className='mb-6 rounded-xl bg-gradient-to-r from-green-800/80 to-emerald-900/80 p-4 flex items-center gap-3 shadow'>
        <span className='text-xl'>
          <svg
            className='inline w-6 h-6 mr-1 text-green-300'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span className='font-bold align-middle'>Amazing job!</span>
        </span>
        <span className='block text-neutral-200 text-sm mt-1'>
          You&apos;ve completed&nbsp;
          <span className='font-bold'>all {totalHabits}</span> habits today.
          Perfect streak! 🔥
        </span>
      </div>
    );
  }

  return (
    <div className='mb-6 rounded-xl bg-gradient-to-r from-indigo-800/80 to-indigo-900/80 p-4 flex items-center gap-3 shadow'>
      <span className='text-xl'>
        <svg
          className='inline w-6 h-6 mr-1 text-blue-300'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z'
          />
        </svg>
        <span className='font-bold align-middle'>Keep it up!</span>
      </span>
      <span className='block text-neutral-200 text-sm mt-1'>
        You&apos;ve completed <span className='font-bold'>{doneToday}</span> out
        of <span className='font-bold'>{totalHabits}</span> habits today. Every
        step counts! 🌱
      </span>
    </div>
  );
};
