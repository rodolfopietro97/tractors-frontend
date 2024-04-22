import { Overlay } from '../Overlay';

/**
 * Content loading component.
 * Used to display a loading overlay over the content if content is loading.
 */
function ContentLoading({
  isLoading,
  error,
  children,
}: {
  isLoading: boolean;
  error?: string;
  children: JSX.Element;
}): JSX.Element {
  /**
   * Loading without errors component
   */
  const LoadingWithoutErrors: JSX.Element = (
    <>
      {isLoading ? (
        <div className='flex w-full flex-row justify-center text-center'>
          <Overlay className='h-20' />
        </div>
      ) : (
        children
      )}
    </>
  );

  /**
   * Loading with errors component
   */
  const LoadingWithErrors: JSX.Element = (
    <div className='text-center text-red-500'>{JSON.stringify(error)}</div>
  );

  return (
    <div>
      {!error ? (
        // No errors in loading
        <>{LoadingWithoutErrors}</>
      ) : (
        // Errors in loading
        <>{LoadingWithErrors}</>
      )}
    </div>
  );
}

export { ContentLoading };
