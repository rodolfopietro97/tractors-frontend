import { FieldValues, Path } from 'react-hook-form';
import { InputProps } from '.';

/**
 * Basic checkbox input component
 */
function CheckboxInput<TFieldFalues extends FieldValues>({
  options,
  id,
  label,
  register,
  ...rest
}: Omit<InputProps<TFieldFalues>, 'errors'>): JSX.Element {
  return (
    <div className='flex flex-row justify-center space-x-2'>
      {/* Input */}
      <div className='py-2'>
        <input
          placeholder={rest.placeholder ?? `... ${label} ...`}
          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
          type='checkbox'
          id={id}
          {...register(id as Path<TFieldFalues>, options)}
          {...rest}
        />
      </div>
      {/* Label */}
      <div className='py-1'>
        <label className='text-xs uppercase' htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}

export { CheckboxInput };
