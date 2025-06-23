'use client';

import { useActionState, useState } from 'react';

import { createHabit } from '@/actions/habits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { BG_COLOR_MAP, COLOR_KEYS, COLORS } from '@/utils/colors';

export default function CreateHabit() {
  const [state, action, loading] = useActionState(createHabit, {
    fields: {},
  });

  const [selectedColor, setSelectedColor] = useState(COLORS.blue);

  return (
    <main className='min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
        <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
          Create a New Habit
        </h1>
        <form action={action} className='space-y-5'>
          <div className='space-y-2'>
            <Label htmlFor='title' className='font-medium text-neutral-200'>
              Habit Name
            </Label>
            <Input
              id='title'
              name='title'
              defaultValue={state.fields.title}
              placeholder='e.g., Drink water, Exercise, Read'
              required
              className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            />
            {state.errors?.title && (
              <p className='text-sm text-red-400'>{state.errors.title}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='description'
              className='font-medium text-neutral-200'
            >
              Description <span className='text-neutral-400'>(optional)</span>
            </Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Brief description of your habit'
              rows={3}
              className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
              defaultValue={state.fields.description}
            />
            {state.errors?.description && (
              <p className='text-sm text-red-400'>{state.errors.description}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='goal' className='font-medium text-neutral-200'>
              Goal <span className='text-neutral-400'>(optional)</span>
            </Label>
            <Input
              id='goal'
              name='goal'
              type='number'
              min={1}
              defaultValue={state.fields.goal}
              placeholder='e.g., 8 glasses of water, 30 minutes of exercise'
              className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
            />
            {state.errors?.goal && (
              <p className='text-sm text-red-400'>{state.errors.goal}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label className='font-medium text-neutral-200'>Color</Label>
            <div className='flex flex-wrap gap-2'>
              <RadioGroup
                name='color'
                value={selectedColor}
                onValueChange={setSelectedColor}
                className='flex flex-wrap gap-2'
              >
                {COLOR_KEYS.map((colorKey) => (
                  <RadioGroupItem
                    key={colorKey}
                    value={colorKey}
                    className={`appearance-none w-8 h-8 rounded-full border-2 border-white outline-none 
                      transition-all ${BG_COLOR_MAP[colorKey]}`}
                    style={{
                      boxShadow:
                        selectedColor === colorKey
                          ? '0 0 0 2px #6366f1'
                          : undefined,
                      transform:
                        selectedColor === colorKey ? 'scale(1.1)' : 'scale(1)',
                    }}
                    aria-label={colorKey}
                  />
                ))}
              </RadioGroup>
            </div>
            {state.errors?.color && (
              <p className='text-sm text-red-400'>{state.errors.color}</p>
            )}
          </div>

          <div className='flex flex-col sm:flex-row gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => window.history.back()}
              className='flex-1 border border-neutral-700 text-neutral-700 hover:bg-neutral-800 hover:text-white transition'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 block w-full p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded disabled:bg-gray-500'
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
