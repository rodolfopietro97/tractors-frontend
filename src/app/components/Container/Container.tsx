import { Button } from '@/app/catalyst-components/button';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { Spinner } from '../Spinner';

/**
 * Define the Container component
 */
export function Container({
  children,
  border,
  isLoading,
  error,
}: {
  children?: JSX.Element;
  border?: boolean;
  isLoading?: boolean;
  error?: string;
}): JSX.Element {
  /**
   * Error content displayed when an error occurs
   */
  const ErrorContent = (
    <div className='rounded-md px-4 py-7'>
      <div className='flex flex-col items-center justify-center'>
        <div className='my-5 flex flex-col items-center justify-center'>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className='h-8 text-red-700'
          />
          <h3 className='my-5 text-sm font-medium text-red-800'>{error}</h3>
        </div>
        <div className='flex'>
          <Link href='/'>
            <Button color='red'>Torna alla pagina principale</Button>
          </Link>
        </div>
      </div>
    </div>
  );

  /**
   * Content without errors (children or loading spinner)
   */
  const NoErrorContent =
    isLoading !== undefined && isLoading ? (
      <Spinner size='sm' />
    ) : (
      <div className='px-4 py-7'>{children}</div>
    );

  return (
    <div
      className={clsx({
        'mx-auto my-5 max-w-5xl rounded-lg bg-white': true,
        'border-2 border-mainBorder': border !== undefined && border,
      })}
    >
      {/* NOTE: Used 3xl here, but feel free to try other max-widths */}
      <div className='mx-auto max-w-5xl'>
        {error !== undefined ? ErrorContent : NoErrorContent}
      </div>
    </div>
  );
}
