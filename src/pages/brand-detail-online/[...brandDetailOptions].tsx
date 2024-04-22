import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useMemo } from 'react';
import { AuthenticationContext } from '@/contexts';
import { useBrandOnline } from '@/hooks';
import { ContentLoading } from '@/app/components/ContentLoading';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { BrandOnlineContent } from '@/app/components/BrandOnlineContent';

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
  const brandName = useMemo<string>(() => {
    if (!router.query.brandDetailOptions) return '';
    return router.query.brandDetailOptions[0] as string;
  }, [router.query.brandDetailOptions]);

  // Get brand files
  const {
    data: brandOnlineData,
    error,
    isLoading,
  } = useBrandOnline(token as string, brandName as string);

  // If brand online has not credentials, redirect to login page of brand website
  // useEffect(() => {
  //   if (!isLoading && !error && data === undefined) router.push(data.url);
  // }, [data]);

  return (
    <main>
      <ContentLoading
        isLoading={isLoading || brandOnlineData === undefined}
        error={error}
      >
        <BrandOnlineContent brandName={brandName} data={brandOnlineData} />
      </ContentLoading>
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
