import { Container } from '@/app/components/Container';
import { PasswordRecoveryForm } from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Password forgot page
 */
const ForgotPassword: NextPageWithLayout = () => {
  // Authentication hook
  const { token } = useAuthentication();

  // Router instance
  const router = useRouter();

  // Redirect to brands page if the user is already logged in
  useEffect(() => {
    if (token !== null) router.push('/brands');
  }, [token]);

  return (
    <main>
      <Container>
        <PasswordRecoveryForm />
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default ForgotPassword;
