'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createHabit, updateHabit } from '@/actions/habit-actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Habit } from '@/prisma';
import { createUpdateHabitSchema } from '@/schemas/habit';
import { BG_COLOR_MAP, COLOR_KEYS, ColorKey } from '@/utils/colors';

interface Props {
  habit?: Habit;
}

export const CreateEditHabitForm = ({ habit }: Props) => {
  const [isPending, startTransition] = useTransition();
  const action = habit ? updateHabit.bind(null, habit.id) : createHabit;
  const [state, formAction, isLoading] = useActionState(action, {
    fields: {
      title: habit?.title || '',
      description: habit?.description || '',
      goal: habit?.goal || undefined,
      color: (habit?.color || 'blue') as ColorKey,
    },
  });

  const form = useForm<z.infer<typeof createUpdateHabitSchema>>({
    resolver: zodResolver(createUpdateHabitSchema),
    defaultValues: {
      title: habit?.title || '',
      description: habit?.description || '',
      goal: habit?.goal || undefined,
      color: (habit?.color || 'blue') as ColorKey,
    },
  });

  // Set server-side errors on the form when state changes
  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([field, message]) => {
        form.setError(field as keyof typeof state.errors, { message });
      });
    }
  }, [state, form]);

  async function onSubmit(values: z.infer<typeof createUpdateHabitSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    startTransition(async () => {
      await formAction(formData);
    });
  }

  return (
    <main className='min-h-[calc(100vh-65px)] bg-neutral-950 text-white flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 sm:p-8 border border-neutral-800'>
        <h1 className='text-2xl font-bold text-center text-indigo-400 mb-6'>
          {habit ? 'Edit habit' : 'Create a New Habit'}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium text-neutral-200'>
                    Habit Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Drink water, Exercise, Read'
                      className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium text-neutral-200'>
                    Description{' '}
                    <span className='text-neutral-400'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Brief description of your habit'
                      rows={3}
                      className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='goal'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium text-neutral-200'>
                    Goal <span className='text-neutral-400'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={1}
                      max={9999}
                      placeholder='Enter a numeric goal (e.g., 8, 30, 10000)'
                      className='w-full bg-neutral-800 text-white border border-neutral-700 placeholder-neutral-500'
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium text-neutral-200'>
                    Color
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
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
                              field.value === colorKey
                                ? '0 0 0 2px #6366f1'
                                : undefined,
                            transform:
                              field.value === colorKey
                                ? 'scale(1.1)'
                                : 'scale(1)',
                          }}
                          aria-label={colorKey}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => window.history.back()}
                className='flex-1 bg-transparent border border-neutral-600 text-neutral-300 rounded hover:bg-neutral-800 hover:text-white hover:border-neutral-500 transition-all'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='flex-1 block w-full p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded disabled:bg-gray-500'
                disabled={isLoading || isPending}
              >
                {isLoading || isPending ? (
                  <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto'></div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};
