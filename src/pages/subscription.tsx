import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { SubscriptionHandler } from '@/app/components/Sucscription';
import { useAuthentication } from '@/hooks';
import { useUserInfo } from '@/hooks/userInfo';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Subscription page
 */
const Subscription: NextPageWithLayout = () => {
  // UserInfo context
  const { subscription } = useUserInfo();

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
        <SubscriptionHandler subscription={subscription} />
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Subscription.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Subscription;
