import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useMemo } from 'react';
import { AuthenticationContext } from '@/contexts';
import { useBrandOnline } from '@/hooks';
import { ContentLoading } from '@/app/components/ContentLoading';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { BrandOnlineContent } from '@/app/components/BrandOnlineContent';
import { json } from 'node:stream/consumers';

/**
 * Brand detail page
 */
const BrandDetailOnline: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Auth context
  const { token } = useContext(AuthenticationContext);

  // Brand name
  const brandName = useMemo<string | null>(() => {
    if (
      router.query.brandDetailOptions === undefined ||
      router.query.brandDetailOptions === undefined ||
      router.query.brandDetailOptions.length === 0
    )
      return null;
    return router.query.brandDetailOptions[0] as string;
  }, [router.query.brandDetailOptions]);

  // Get brand files
  const { data, error, isLoading } = useBrandOnline(token, brandName);

  return (
    <main>
      <ContentLoading
        isLoading={data === undefined || brandName === null}
        error={error}
      >
        <>
          {data !== undefined && brandName !== null && (
            <BrandOnlineContent brandName={brandName as string} data={data} />
          )}
        </>
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
