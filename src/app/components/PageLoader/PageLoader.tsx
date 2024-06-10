import { Center, Flex, Spinner } from '@chakra-ui/react';

/**
 * Entire Page Loader Component
 */
function PageLoader(): JSX.Element {
  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      alignContent={'center'}
      justifyContent={'center'}
    >
      <Center>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    </Flex>
  );
}

export { PageLoader };
