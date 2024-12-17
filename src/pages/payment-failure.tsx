import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Payment failure page
 */
const PaymentFailure: NextPageWithLayout = () => {
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
      <Container error={'Pagamento fallito!'} />
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PaymentFailure.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PaymentFailure;
