'use client';
import { Calendar } from '@/components/ui/calendar';
import { BG_COLOR_MAP, ColorKey } from '@/utils/colors';
import { formatDate } from '@/utils/dates';

interface Props {
  completedDates: Date[];
  habitColor: ColorKey;
}

export const CompletionCalendar = ({ completedDates, habitColor }: Props) => {
  const completedDateStrings = completedDates.map((date) => formatDate(date));

  return (
    <div className='flex items-center justify-center flex-col'>
      <Calendar
        mode='multiple'
        selected={completedDates}
        className='rounded-lg border border-neutral-800 bg-neutral-900 text-white'
        modifiers={{
          completed: (date) => {
            const day = new Date(date);
            return completedDateStrings.includes(formatDate(day));
          },
        }}
        modifiersClassNames={{
          completed: `${BG_COLOR_MAP[habitColor]} rounded-md`,
        }}
        classNames={{
          day: 'pointer-events-none border border-transparent p-2 m-1',
          day_button: 'bg-transparent!',
          today: 'border-2 border-white',
        }}
      />
      <div className='flex gap-4 mt-4 min-w-[120px]'>
        <div className='flex items-center gap-2'>
          <span
            className={`inline-block w-4 h-4 rounded-full ${BG_COLOR_MAP[habitColor]}`}
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
