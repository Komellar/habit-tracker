interface Props {
  totalItems: number;
  limit: number;
  page: number;
}

export const PaginationInfo = ({ totalItems, limit, page }: Props) => {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className='text-sm text-neutral-400 bg-neutral-900/50 px-3 py-1.5 rounded-md border border-neutral-800'>
      Showing&nbsp;
      <span className='font-medium text-neutral-300'>{startItem}&nbsp;</span>
      to&nbsp;
      <span className='font-medium text-neutral-300'>{endItem}&nbsp;</span>
      of&nbsp;
      <span className='font-medium text-neutral-300'>{totalItems}&nbsp;</span>
      results
    </div>
  );
};
