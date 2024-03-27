import React from 'react';
import { RowColHelper } from '../../RowColHelper';

/**
 * Forms layout component body
 */
function Body({
  children,
  error,
}: {
  children: Array<JSX.Element>;
  error: string | null;
}): JSX.Element {
  return (
    <>
      <RowColHelper
        className='flex flex-col items-center justify-center space-y-3 text-center'
        classNames={children.map(() => 'w-full sm:w-1/2 md:w-1/3 px-2 py-2')}
      >
        {children}
      </RowColHelper>
      <div className='my-5 flex flex-col items-center justify-center space-y-3 text-center'>
        {error && (
          <span key={children.length + 3} className='text-xs text-red-400'>
            {error}
          </span>
        )}
      </div>
    </>
  );
}

/**
 * Forms Layout Row of 2 elements
 */
function PairRow({ children }: { children: Array<JSX.Element> }): JSX.Element {
  return (
    <RowColHelper
      className='flex flex-col justify-between md:flex-row md:space-x-3'
      classNames={[
        'w-full md:w-1/2 my-2 md:my-0',
        'w-full md:w-1/2 my-2 md:my-0',
      ]}
    >
      {children}
    </RowColHelper>
  );
}

const FormsLayout = { Body, PairRow };
export { FormsLayout };
