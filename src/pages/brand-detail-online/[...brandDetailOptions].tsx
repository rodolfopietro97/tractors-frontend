import { BrandOnlineContent } from '@/app/components/BrandOnlineContent';
import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useAuthentication, useBrandOnline } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo } from 'react';

/**
 * Brand detail page
 */
const BrandDetailOnline: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Auth context
  const { token } = useAuthentication();

  // Redirect to login page if the user is NOT logged in
  useEffect(() => {
    if (token === null) router.push('/login');
  }, [token]);

  // Brand name
  const brandName = useMemo<string | null>(() => {
    if (
      router.query.brandDetailOptions === undefined ||
      router.query.brandDetailOptions.length === 0
    )
      return null;
    return router.query.brandDetailOptions[0] as string;
  }, [router.query.brandDetailOptions]);

  // Get brand files
  const { data } = useBrandOnline(token, brandName);

  return (
    <main>
      <Container isLoading={data === undefined || brandName === null}>
        <>
          {data !== undefined && brandName !== null && (
            <BrandOnlineContent brandName={brandName as string} data={data} />
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
BrandDetailOnline.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default BrandDetailOnline;
