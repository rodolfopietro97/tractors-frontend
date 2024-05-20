import { Spinner } from '@chakra-ui/react';

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
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
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
