import { FieldValues, Path } from 'react-hook-form';
import { InputProps } from '.';
import { Input, Stack, Text } from '@chakra-ui/react';
import clsx from 'clsx';

/**
 * Basic text inpuit component
 */
function TextInput<TFieldFalues extends FieldValues>({
  options,
  id,
  label,
  register,
  errors,
  ...rest
}: Omit<InputProps<TFieldFalues>, 'size'>): JSX.Element {
  return (
    <Stack>
      <Text fontSize='xs' className='uppercase' mb='2'>
        {label}
      </Text>
      <Input
        placeholder={rest.placeholder ?? `... ${label} ...`}
        id={id}
        size='sm'
        {...register(id as Path<TFieldFalues>, options)}
        {...rest}
      />

      <Text
        className={clsx({
          invisible: errors[id]?.message === undefined,
          visible: errors[id]?.message !== undefined,
        })}
        color='red.400'
        fontSize='xs'
      >
        {errors[id]?.message as string}
      </Text>
    </Stack>
    // <div className='flex flex-col justify-items-start'>
    //   {/* Label */}
    //   <div className='text-left'>
    //     <label className='text-xs uppercase text-slate-400' htmlFor={id}>
    //       {label}
    //     </label>
    //   </div>
    //   {/* Input */}
    //   <div>
    //     <input
    //       placeholder={rest.placeholder ?? `... ${label} ...`}
    //       className='w-full rounded-md border px-3 py-1 placeholder:text-xs placeholder:uppercase'
    //       type='text'
    //       id={id}
    //       {...register(id as Path<TFieldFalues>, options)}
    //       {...rest}
    //     />
    //   </div>
    //   {/* Error */}
    //   <div className='text-left'>
    //     {errors[id]?.message && (
    //       <span className='text-xs text-red-400'>
    //         {errors[id]?.message as string}
    //       </span>
    //     )}
    //   </div>
    // </div>
  );
}

export { TextInput };
