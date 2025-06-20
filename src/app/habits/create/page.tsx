'use client';

import { useActionState } from 'react';

import { createHabit } from '@/actions/habits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreateHabit() {
  const [state, action, loading] = useActionState(createHabit, {
    fields: {},
  });

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8'>
        <h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
          Create a New Habit
        </h1>
        <form action={action} className='space-y-5'>
          <div className='space-y-2'>
            <Label htmlFor='title' className='font-medium text-gray-700'>
              Habit Name
            </Label>
            <Input
              id='title'
              name='title'
              defaultValue={state.fields.title}
              placeholder='e.g., Drink water, Exercise, Read'
              // required
              className='w-full'
            />
            {state.errors?.title && (
              <p className='text-sm text-red-500'>{state.errors.title}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description' className='font-medium text-gray-700'>
              Description <span className='text-gray-400'>(optional)</span>
            </Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Brief description of your habit'
              rows={3}
              className='w-full'
              defaultValue={state.fields.description}
            />
            {state.errors?.description && (
              <p className='text-sm text-red-500'>{state.errors.description}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='goal' className='font-medium text-gray-700'>
              Goal <span className='text-gray-400'>(optional)</span>
            </Label>
            <Input
              id='goal'
              name='goal'
              type='number'
              defaultValue={state.fields.goal}
              placeholder='e.g., 8 glasses of water, 30 minutes of exercise'
              className='w-full'
            />
            {state.errors?.goal && (
              <p className='text-sm text-red-500'>{state.errors.goal}</p>
            )}
          </div>

          <div className='flex flex-col sm:flex-row gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => window.history.back()}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500'
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
