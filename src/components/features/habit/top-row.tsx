import { BG_COLOR_MAP, ColorKey } from '@/utils/colors';

interface Props {
  title: string;
  color: ColorKey;
}

export const TopRow = ({ title, color }: Props) => {
  return (
    <div className='flex items-center justify-between mb-2'>
      <div className='flex items-center gap-3'>
        <span
          className={`w-7 h-7 rounded-full ${BG_COLOR_MAP[color]} flex items-center justify-center`}
        >
          {/* colored dot */}
        </span>
        <h1 className='text-2xl font-bold'>{title}</h1>
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
  );
};
