import { ZodError } from 'zod';

type GenericErrors = Record<string, string>;

type GenericFields = Record<string, unknown>;

interface FormState<E = GenericErrors, F = GenericFields> {
  errors?: E;
  fields: F;
}

export function handleZodErrors<
  E extends GenericErrors,
  F extends GenericFields,
>(error: ZodError, fields: F): FormState<E, F> {
  const errors = {} as E;

  error.errors.forEach((err) => {
    if (err.path[0] && typeof err.path[0] === 'string') {
      errors[err.path[0] as keyof E] = err.message as E[keyof E];
    }
  });

  return { errors, fields };
}
