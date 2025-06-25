import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-8'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold  mb-4'>Page Not Found</h1>
        <p className='text-neutral-300 mb-6'>
          The page you are looking for does not exist.
        </p>
        <Link
          href='/'
          className='bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded'
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}
