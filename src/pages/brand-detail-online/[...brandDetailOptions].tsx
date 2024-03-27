import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useMemo } from 'react';
import { AuthenticationContext } from '@/contexts';
import { useBrandOnline } from '@/hooks';
import { ContentLoading } from '@/app/components/ContentLoading';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';

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
  const { data, error, isLoading } = useBrandOnline(
    token as string,
    brandName as string
  );

  // If brand online has not credentials, redirect to login page of brand website
  useEffect(() => {
    if (!isLoading && !error && data === undefined) router.push(data.url);
  }, [data]);

  return (
    <main>
      <ContentLoading
        isLoading={isLoading || data?.code == 'token_not_valid'}
        error={error}
      >
        <>
          {data && (
            <>
              <h4>
                Connettiti al sito{' '}
                <Link href={data.url} className='text-blue-500'>
                  {data.url}
                </Link>{' '}
                con le seguenti credenziali:
              </h4>
              <br />
              <p>
                <b>Username</b>: {data.credentials.username}
              </p>
              <p>
                <b>Password</b>: {data.credentials.password}
              </p>
            </>
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
