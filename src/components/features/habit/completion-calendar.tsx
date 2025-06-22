'use client';
import { Calendar } from '@/components/ui/calendar';
import { ColorKey, COLORS } from '@/utils/colors';

interface Props {
  completedDates: Date[];
  habitColor: ColorKey;
}

export const CompletionCalendar = ({ completedDates, habitColor }: Props) => {
  const completedDateStrings = completedDates.map((date) =>
    date.toISOString().slice(0, 10)
  );

  return (
    <div className='flex items-center justify-center flex-col'>
      <Calendar
        mode='multiple'
        selected={completedDates}
        className='rounded-lg border border-neutral-800 bg-neutral-900 text-white'
        modifiers={{
          completed: (date) =>
            completedDateStrings.includes(date.toISOString().slice(0, 10)),
        }}
        modifiersStyles={{
          completed: {
            backgroundColor: `${COLORS[habitColor]}`,
            color: '#fff',
            borderRadius: '0.375rem',
          },
          today: {
            border: '2px solid white',
          },
        }}
        classNames={{
          day: 'pointer-events-none border border-transparent p-2 m-1',
          day_button: 'bg-transparent!',
          button_next: 'hover:cursor-pointer',
          button_previous: 'hover:cursor-pointer',
        }}
      />
      <div className='flex gap-4 mt-4 min-w-[120px]'>
        <div className='flex items-center gap-2'>
          <span
            className='inline-block w-4 h-4 rounded-full'
            style={{ backgroundColor: COLORS[habitColor] }}
          />
          <span className='text-sm text-neutral-300'>Completed day</span>
        </div>
        <div className='flex items-center gap-2'>
          <span
            className='inline-block w-4 h-4 rounded-full border-2 border-white'
            style={{ backgroundColor: 'transparent' }}
          />
          <span className='text-sm text-neutral-300'>Today</span>
        </div>
      </div>
    </div>
  );
};
