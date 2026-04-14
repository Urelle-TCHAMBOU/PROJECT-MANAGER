// ─── hooks/useForm.ts ─────────────────────────────────────────────────────────
//
// Custom hook : formulaire contrôlé avec validation, gestion du touched,
// des erreurs et de la soumission.

import { useState, useCallback } from 'react';
import type { FormErrors } from '../types';

type ValidateFn<T> = (values: T) => FormErrors<T>;

interface UseFormReturn<T> {
  values:       T;
  errors:       FormErrors<T>;
  touched:      Partial<Record<keyof T, boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur:   (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSuccess: (values: T) => void) => (e?: React.FormEvent) => void;
  reset:        () => void;
  setValues:    React.Dispatch<React.SetStateAction<T>>;
}

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validate?: ValidateFn<T>,
): UseFormReturn<T> {
  const [values,  setValues]  = useState<T>(initialValues);
  const [errors,  setErrors]  = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const runValidation = useCallback(
    (v: T) => (validate ? validate(v) : {}),
    [validate],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const next = { ...values, [name]: value };
      setValues(next);
      if (touched[name as keyof T]) {
        setErrors(runValidation(next));
      }
    },
    [values, touched, runValidation],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((t) => ({ ...t, [name]: true }));
      setErrors(runValidation(values));
    },
    [values, runValidation],
  );

  const handleSubmit = useCallback(
    (onSuccess: (values: T) => void) =>
      (e?: React.FormEvent) => {
        e?.preventDefault();
        // Marquer tous les champs comme touchés
        const allTouched = Object.keys(values).reduce(
          (acc, k) => ({ ...acc, [k]: true }),
          {} as Record<keyof T, boolean>,
        );
        setTouched(allTouched);
        const errs = runValidation(values);
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
          onSuccess(values);
        }
      },
    [values, runValidation],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset, setValues };
}
