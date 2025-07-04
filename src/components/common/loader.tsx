export const LoaderMedium = () => {
  return (
    <div className='flex items-center justify-center h-40'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white'></div>
    </div>
  );
};

export const LoaderLarge = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white'></div>
    </div>
  );
};
