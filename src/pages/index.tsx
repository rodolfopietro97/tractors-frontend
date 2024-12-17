import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Home page
 */
const Home: NextPageWithLayout = () => {
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
        <>
          <h1 className='text-2xl'>Home page</h1>
          <p className='my-10'>
            Qui mettiamo qualche grafica carina con le informazioni varie... SAL
            3
          </p>
        </>
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Home;
