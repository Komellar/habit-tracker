import Link from 'next/link';

import { DeleteHabitButton } from '@/components/features/habit/delete-habit-btn';
import { BG_COLOR_MAP, ColorKey } from '@/utils/colors';

interface Props {
  habitId: string;
  title: string;
  color: ColorKey;
}

export const TopRow = ({ habitId, title, color }: Props) => {
  return (
    <div className='flex items-center justify-between mb-2'>
      <div className='flex items-center gap-3'>
        <span
          className={`w-7 h-7 rounded-full ${BG_COLOR_MAP[color]} flex items-center justify-center`}
        ></span>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
      <div className='flex gap-2'>
        <Link
          className='p-2 rounded bg-neutral-800 hover:bg-neutral-700 transition'
          title='Edit'
          href={`/habits/${habitId}/edit`}
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
        </Link>
        <DeleteHabitButton habitId={habitId} redirection />
      </div>
    </div>
  );
};
