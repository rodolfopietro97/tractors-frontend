import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useMemo } from 'react';
import { AuthenticationContext } from '@/contexts';
import { useBrandOnline } from '@/hooks';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { BrandOnlineContent } from '@/app/components/BrandOnlineContent';
import { Article } from '@/app/components/Article';

/**
 * Brand detail page
 */
const BrandDetailOnline: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Auth context
  const { token, isJWTValid } = useContext(AuthenticationContext);

  // Redirect to pricing if not logged in
  useEffect(() => {
    if (!isJWTValid) {
      router.push('/pricing');
    }
  }, [isJWTValid, router]);

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
      <Article isLoading={data === undefined || brandName === null} border>
        <>
          {data !== undefined && brandName !== null && (
            <BrandOnlineContent brandName={brandName as string} data={data} />
          )}
        </>
      </Article>
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
