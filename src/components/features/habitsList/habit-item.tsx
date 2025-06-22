'use client';
import Link from 'next/link';
import { useActionState } from 'react';

import { deleteHabit } from '@/actions/habits';
import { COLORS } from '@/utils/colors';

import { Habit } from '../../../../generated/prisma';

interface Props {
  habit: Habit;
}

export const HabitItem = ({ habit }: Props) => {
  const [, deleteAction, pending] = useActionState(deleteHabit, null);

  return (
    <div
      key={habit.id}
      className='bg-neutral-900 rounded-xl shadow p-6 relative'
    >
      <div className='flex items-start justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <Link href={`habits/${habit.id}`} className='text-lg font-bold'>
              {habit.title}
            </Link>
            <span
              className={`w-3 h-3 rounded-full`}
              style={{ backgroundColor: COLORS[habit.color] }}
            ></span>
          </div>
          {habit.description && (
            <p className='text-neutral-400 text-sm mt-1'>{habit.description}</p>
          )}
        </div>
        <form
          action={deleteAction.bind(null, habit.id)}
          className='flex items-center'
        >
          {pending ? (
            <div className='animate-spin rounded-full h-5 w-5 order-t-2 border-b-2 border-white'></div>
          ) : (
            <button
              className='text-neutral-500 hover:text-red transition'
              title='Delete habit'
              type='submit'
            >
              <svg
                width={20}
                height={20}
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </form>
      </div>
      <button
        className={`mt-4 px-4 py-2 rounded border font-medium transition
          hover:opacity-75 hover:cursor-pointer`}
        style={{ borderColor: COLORS[habit.color] }}
      >
        ✓ Mark Done
      </button>
      <div className='mt-6'>
        <div className='text-xs text-neutral-400 mb-1'>Last 7 days</div>
        <div className='flex gap-1'>
          {[14, 15, 16, 17, 18, 19, 20].map((day, i) => (
            <div
              key={day}
              className={`flex-1 h-7 rounded
                ${i === 6 ? 'border-2 border-white' : ''}`}
              style={{ backgroundColor: COLORS[habit.color] }}
            >
              <span className='flex items-center justify-center h-full text-xs font-semibold'>
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
