import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import {
  BrandFilesLayout,
  LAYOUT_TYPE,
  PageLayout,
  PDFViewerLayout,
} from '@/app/components/Layouts';
import { Navbar } from '@/app/components/Navbar';
import { AuthenticationProvider, UserInfoProvider } from '@/contexts';
import { useAuthentication } from '@/hooks';
import { CustomerRegistrationCheckMiddleware } from '@/middleware-components';
import { JWT_CHECK_TIME } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleRedirect } from '../../../utils/redirect-handler';
import { Spinner } from '../Spinner';

export function Layout({
  children,
  layoutType,
}: {
  children: JSX.Element;
  layoutType: LAYOUT_TYPE;
}): JSX.Element {
  // Authentication context
  const { token } = useAuthentication();

  // Router
  const router = useRouter();

  // Loading state of page (needed to wait correct JWT)
  const [isLoadingJWTToken, setIsLoadingJWTToken] = useState(true);

  // Redirect handler
  useEffect(() => {
    // Give time to check the token
    const loadToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, JWT_CHECK_TIME));
      setIsLoadingJWTToken(false);
    };
    loadToken();

    // JWT loading is finished
    if (!isLoadingJWTToken) handleRedirect(token, router);
  }, [token, isLoadingJWTToken]);

  /**
   * Main navbar
   */
  const mainNavbar = (
    <Navbar
      menuEntriesNotLoggedIn={[
        { name: 'Home', href: '/' },
        { name: 'Abbonamenti', href: '/pricing' },
        { name: 'Catalogo', href: '/brands' },
        { name: 'Contatti', href: '/contacts' },
      ]}
      menuEntriesLoggedIn={[
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Catalogo', href: '/brands' },
      ]}
    />
  );

  /**
   * Main header
   */
  const mainHeader = <Header />;

  /**
   * Main footer
   */
  const mainFooter = (
    <Footer
      footerMenuEntries={[
        { name: 'Abbonamenti', href: '/pricing' },
        { name: 'Termini servizio', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
      ]}
    />
  );

  /**
   * Return the layout based on the layout type
   */
  const LayoutToApply = (): JSX.Element => {
    switch (layoutType) {
      case LAYOUT_TYPE.PAGE:
        return (
          <PageLayout
            navbar={mainNavbar}
            header={mainHeader}
            footer={mainFooter}
            showHeader={false}
          >
            {/*Middlewares*/}
            <CustomerRegistrationCheckMiddleware>
              {children}
            </CustomerRegistrationCheckMiddleware>
          </PageLayout>
        );

      case LAYOUT_TYPE.PDF_VIEWER:
        return (
          // NOTE: No middleware here
          <PDFViewerLayout>{children}</PDFViewerLayout>
        );

      case LAYOUT_TYPE.BRAND_FILES:
        return (
          /*Middlewares*/
          <CustomerRegistrationCheckMiddleware>
            <BrandFilesLayout navbar={mainNavbar}>{children}</BrandFilesLayout>
          </CustomerRegistrationCheckMiddleware>
        );
    }
  };

  return (
    /*Providers for context*/
    <AuthenticationProvider>
      <UserInfoProvider>
        {/* Main page layout or loading (needed to wait correct JWT) */}
        {isLoadingJWTToken ? (
          // Spinner over the page
          <div className='flex h-screen w-screen items-center justify-center'>
            <Spinner size='md' />
          </div>
        ) : (
          // Apply the layout
          <LayoutToApply />
        )}
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
