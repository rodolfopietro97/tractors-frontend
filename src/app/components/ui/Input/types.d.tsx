import { InputHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

/**
 * Input component props type
 */
interface InputProps<TFieldFalues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  options?: RegisterOptions<TFieldFalues, Path<TFieldFalues>>;
  id: string;
  label: string;
  register: UseFormRegister<TFieldFalues>;
  errors: FieldErrors<TFieldFalues>;
}

/**
 * Text area input component props type
 */
interface TextAreaInputProps<TFieldFalues extends FieldValues>
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  options?: RegisterOptions<TFieldFalues, Path<TFieldFalues>>;
  id: string;
  label: string;
  register: UseFormRegister<TFieldFalues>;
  errors: FieldErrors<TFieldFalues>;
}

/**
 * Select input component props type
 */
interface SelectInputProps<TFieldFalues extends FieldValues>
  extends InputHTMLAttributes<HTMLSelectElement> {
  options?: RegisterOptions<TFieldFalues, Path<TFieldFalues>>;
  id: string;
  label: string;
  register: UseFormRegister<TFieldFalues>;
  selectOptions: Array<{ value: string; text: string }>;
}

export { type InputProps, type SelectInputProps, type TextAreaInputProps };
