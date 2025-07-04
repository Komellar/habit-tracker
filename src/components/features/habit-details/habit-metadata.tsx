import { ColorKey, COLORS } from '@/utils/colors';

interface Props {
  goal: number | null;
  description: string | null;
  color: ColorKey;
  createdAt: Date;
}

export const HabitMetadata = ({
  goal,
  color,
  createdAt,
  description,
}: Props) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(createdAt);

  const daysSinceCreation = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className='mb-6'>
      {description && (
        <p className='mb-4 text-neutral-300 text-lg'>{description}</p>
      )}

      <div className='flex flex-wrap gap-2 mb-6'>
        <div className='inline-flex items-center px-3 py-1.5 rounded-md bg-neutral-800/60 text-sm border border-neutral-700'>
          <svg
            className='w-4 h-4 mr-2'
            style={{ color: COLORS[color] }}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <span>
            Started {formattedDate}&nbsp;
            <span className='text-neutral-400'>
              ({daysSinceCreation} days ago)
            </span>
          </span>
        </div>

        {goal && (
          <div className='inline-flex items-center px-3 py-1.5 rounded-md bg-neutral-800/60 text-sm border border-neutral-700'>
            <svg
              className='w-4 h-4 mr-2'
              style={{ color: COLORS[color] }}
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
            <span>
              Target streak:&nbsp;
              <span className='font-medium'>
                {goal} {goal === 1 ? 'day' : 'days'}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
