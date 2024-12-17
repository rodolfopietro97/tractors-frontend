'use client';
import { Button } from '@/app/catalyst-components/button';
import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication, useUserDetails } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Dashboard page
 */
const Dashboard: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Authentication context
  const { token } = useAuthentication();

  // Redirect to login page if the user is NOT logged in
  useEffect(() => {
    if (token === null) router.push('/login');
  }, [token]);

  // User details
  const { data, error, isLoading } = useUserDetails(token);

  return (
    <main>
      <div>
        <Container
          isLoading={isLoading || data?.code == 'token_not_valid'}
          error={error}
        >
          <>
            {data?.email && (
              <SimpleGrid columns={1} spacing={5}>
                <Text mb={10}>
                  <h1 className='text-2xl'>Benvenuto {data.email}</h1>
                </Text>
                <Button color='white' onClick={() => router.push('/profile')}>
                  <FontAwesomeIcon icon={faUser} />
                  Gestisci il tuo profilo
                </Button>
                <Button
                  color='white'
                  onClick={() => router.push('/subscription')}
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  Sottoscrizioni e Pagamento
                </Button>
              </SimpleGrid>
            )}
          </>
        </Container>
      </div>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Dashboard;
