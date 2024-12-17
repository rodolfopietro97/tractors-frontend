import { Container } from '@/app/components/Container';
import { RegistrationForm } from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Registration page
 */
const Register: NextPageWithLayout = () => {
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
        <RegistrationForm />
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Register.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Register;
