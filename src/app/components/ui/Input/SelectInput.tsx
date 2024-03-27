import { FieldValues, Path } from 'react-hook-form';
import { SelectInputProps } from '.';

/**
 * Basic select input component
 */
function SelectInput<TFieldFalues extends FieldValues>({
  selectOptions,
  options,
  id,
  label,
  register,
  ...rest
}: SelectInputProps<TFieldFalues>): JSX.Element {
  return (
    <div className='flex flex-col justify-items-start'>
      {/* Label */}
      <div className='text-left'>
        <label className='text-xs uppercase text-slate-400' htmlFor={id}>
          {label}
        </label>
      </div>
      {/* Input */}
      <div>
        <select
          className='w-full rounded-md border px-3 py-1 placeholder:text-xs placeholder:uppercase disabled:bg-slate-100'
          id={id}
          {...register(id as Path<TFieldFalues>, options)}
          {...rest}
        >
          {/* Select options */}
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export { SelectInput };
