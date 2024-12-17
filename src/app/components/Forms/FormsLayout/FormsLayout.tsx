import { Container, SimpleGrid } from '@chakra-ui/react';

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
      <Container maxW='md' color='black'>
        <SimpleGrid columns={1} spacing={5}>
          {children}
        </SimpleGrid>
        <div className='my-5 flex flex-col items-center justify-center space-y-3 text-center'>
          {error && (
            <span key={children.length + 3} className='text-xs text-red-400'>
              {error}
            </span>
          )}
        </div>
      </Container>
    </>
  );
}

/**
 * Forms Layout Row of 2 elements
 */
function PairRow({ children }: { children: Array<JSX.Element> }): JSX.Element {
  return (
    <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={3}>
      {children}
    </SimpleGrid>
  );
}

const FormsLayout = { Body, PairRow };
export { FormsLayout };
