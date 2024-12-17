import { Container } from '@/app/components/Container';
import { PasswordResetForm } from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

/**
 * Email confirmation page
 */
const PasswordResetConfirm: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Authentication context
  const { token } = useAuthentication();

  // Redirect to brands page if the user is already logged in
  useEffect(() => {
    if (token !== null) router.push('/brands');
  }, [token]);

  return (
    <main>
      <Container
        isLoading={
          router.query.userParameters === undefined ||
          router.query.userParameters[0] == undefined ||
          router.query.userParameters[1] == undefined
        }
        error={
          router.query.userParameters?.length !== 2
            ? 'Link non valido'
            : undefined
        }
      >
        <>
          {router.query.userParameters &&
            router.query.userParameters[0] &&
            router.query.userParameters[1] && (
              <PasswordResetForm
                uid={router.query.userParameters[0] as string}
                token={router.query.userParameters[1] as string}
              />
            )}
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
PasswordResetConfirm.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PasswordResetConfirm;
