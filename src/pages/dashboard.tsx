'use client';
import { AuthenticationContext } from '@/contexts';
import { useUserDetails } from '@/hooks';
import {
  faBook,
  faUser,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useContext } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { Article } from '@/app/components/Article';
import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Dashboard page
 */
const Dashboard: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Authentication context
  const { token } = useContext(AuthenticationContext);

  // User details
  const { data, error, isLoading } = useUserDetails(token);

  return (
    <main>
      <div>
        <Article
          isLoading={isLoading || data?.code == 'token_not_valid'}
          error={error}
          border
        >
          <>
            {data?.email && (
              <SimpleGrid columns={1} spacing={5}>
                <Text mb={10}>
                  <h1 className='text-2xl'>Benvenuto {data.email}</h1>
                </Text>
                <Button
                  onClick={() => router.push('/profile')}
                  leftIcon={<FontAwesomeIcon icon={faUser} className='h-4' />}
                >
                  Gestisci il tuo profilo
                </Button>
                <Button
                  onClick={() => router.push('/brands')}
                  leftIcon={<FontAwesomeIcon icon={faBook} className='h-4' />}
                >
                  Consulta il catalogo
                </Button>
                <Button
                  onClick={() => router.push('/subscription')}
                  leftIcon={
                    <FontAwesomeIcon icon={faCreditCard} className='h-4' />
                  }
                >
                  Sottoscrizioni e Pagamento
                </Button>
              </SimpleGrid>
            )}
          </>
        </Article>
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
