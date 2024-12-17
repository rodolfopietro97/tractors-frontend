import { Button } from '@/app/catalyst-components/button';
import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Payment successful page
 */
const PaymentSuccess: NextPageWithLayout = () => {
  // Authentication hook
  const { token } = useAuthentication();

  // Router instance
  const router = useRouter();

  // Redirect to login page if the user is NOT logged in
  useEffect(() => {
    if (token === null) router.push('/login');
  }, [token]);

  return (
    <main>
      <Container>
        <div className='rounded-md px-4 py-7'>
          <div className='flex flex-col items-center justify-center'>
            <div className='my-5 flex flex-col items-center justify-center'>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className='h-8 text-green-700'
              />
              <h3 className='my-5 text-sm font-medium text-green-800'>
                Pagamento effettuato con successo
              </h3>
            </div>
            <div className='flex'>
              <Link href='/'>
                <Button color='green'>Torna alla pagina principale</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PaymentSuccess.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PaymentSuccess;
