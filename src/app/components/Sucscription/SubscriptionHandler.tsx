import { SubscriptionType } from '@/app/components/Sucscription/types.d';
import { Card, CardBody } from '@chakra-ui/card';
import {
  Box,
  Button,
  CardHeader,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts';
import { deleteSubscriptionFetcher } from '@/fetchers';
import Link from 'next/link';

function SubscriptionHandler({
  subscription,
}: {
  subscription: SubscriptionType | null;
}): JSX.Element {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

  // A subscription exists
  if (subscription !== null)
    return (
      <Card>
        <CardHeader>
          <Heading size='md'>La tua sottoscrizione</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Data di inizio
              </Heading>
              <Text pt='2' fontSize='sm'>
                {new Date(
                  subscription.current_period_start
                ).toLocaleDateString()}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Data di scadenza
              </Heading>
              <Text pt='2' fontSize='sm'>
                {new Date(subscription.current_period_end).toLocaleDateString()}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Stato
              </Heading>
              <Text pt='2' fontSize='sm'>
                {subscription.status === 'active' ? 'Attiva' : 'Non attiva'}
              </Text>
            </Box>
            <Box mt='10'>
              <Container centerContent>
                <Button
                  rightIcon={
                    <FontAwesomeIcon icon={faTrash} className='mr-2 h-4' />
                  }
                  colorScheme='red'
                  width='fit-content'
                  size='md'
                  onClick={async () => {
                    const response = await deleteSubscriptionFetcher(
                      token as string
                    );
                    const result = await response.json();
                    if (result.status === 'ok') {
                      console.log('Subscription deleted');
                    }
                  }}
                >
                  Elimina
                </Button>
              </Container>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );

  // Subscription is null
  return (
    <SimpleGrid columns={1} spacingY='5'>
      <h1 className='text-2xl text-black'>Non hai sottoscrizioni attive!</h1>
      <p>
        <Link href='/pricing' className='text-blue-400 hover:underline'>
          Sottoscrivi un abonamento
        </Link>{' '}
        per usufruire di tutti i contenuti offerti dalla piattaforma
      </p>
    </SimpleGrid>
  );
}

export { SubscriptionHandler };
