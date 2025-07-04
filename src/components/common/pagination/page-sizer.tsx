'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../ui/select';

interface Props {
  limit: number;
  search?: string;
}

export const PageSizer = ({ limit, search }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLimitChange = (value: string) => {
    if (!search) {
      router.push(`${pathname}?page=1&limit=${value}`);
    } else {
      router.push(`${pathname}?page=1&limit=${value}&search=${search}`);
    }
  };

  return (
    <Select value={limit.toString()} onValueChange={handleLimitChange}>
      <SelectTrigger className='w-[110px] h-10 bg-neutral-800 border-neutral-700 text-neutral-300 rounded cursor-pointer hover:bg-neutral-750 transition-colors'>
        <div className='flex items-center justify-between w-full'>
          <span>{limit} / page</span>
        </div>
      </SelectTrigger>
      <SelectContent className='bg-neutral-800 border-neutral-700 text-white'>
        {[2, 5, 10, 20].map((item) => (
          <SelectItem
            key={item.toString()}
            value={item.toString()}
            className='hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer'
          >
            {item} / page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
