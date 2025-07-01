import { SignUpForm } from '@/components/features/auth/sign-up-form';

export default async function SignUp() {
  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 bg-gradient-to-b from-neutral-950 to-neutral-900'>
      <div className='max-w-md w-full text-center'>
        <h1 className='text-3xl font-bold mb-4 text-white'>Sign Up</h1>
        <p className='text-lg text-neutral-300 mb-8'>
          Create an account to start tracking your habits.
        </p>
        {/* Sign Up Form Component would go here */}
        <SignUpForm />
      </div>
    </main>
  );
}
