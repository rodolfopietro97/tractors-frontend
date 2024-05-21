import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Spinner,
} from '@chakra-ui/react';
import clsx from 'clsx';

/**
 * Article component
 */
function Article({
  children,
  border,
  isLoading,
  error,
  success,
}: {
  children: JSX.Element;
  border?: boolean;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
}): JSX.Element {
  // Content without errors (children or loading spinner)
  const NoErrorContent = (
    <>
      {isLoading !== undefined && isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        children
      )}
    </>
  );

  // Container with content
  const ErrorContent = (
    <>
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
      >
        <AlertIcon boxSize='56px' mr={0} />
        <AlertTitle mt={10} mb={10} fontSize='xl'>
          {error}
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Siamo spiacenti ma c&apos;è stato un errore durante il
          l&apos;operazione richiesta.
        </AlertDescription>
      </Alert>
    </>
  );

  return (
    <Container
      maxW='container.2xl'
      py='28'
      mb={20}
      mt={20}
      className={clsx({
        'rounded-lg bg-article': true,
        'border-2 border-mainBorder': border !== undefined && border,
        'bg-error': error !== undefined,
        'bg-success': success !== undefined && success,
      })}
      centerContent
    >
      {error !== undefined ? ErrorContent : NoErrorContent}
    </Container>
  );
}

export { Article };
