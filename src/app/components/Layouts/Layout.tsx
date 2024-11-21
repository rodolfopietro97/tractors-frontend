import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Navbar } from '@/app/components/Navbar';
import {
  AuthenticationContext,
  AuthenticationProvider,
  UserInfoProvider,
} from '@/contexts';
import {
  PageLayout,
  LAYOUT_TYPE,
  PDFViewerLayout,
  BrandFilesLayout,
} from '@/app/components/Layouts';
import {
  CustomerRegistrationCheckMiddleware,
  SubscriptionCheckMiddleware,
} from '@/middleware-components';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PageLoader } from '@/app/components/PageLoader';
import { JWT_CHECK_TIME } from '@/utils';
import { handleRedirect } from '../../../utils/redirect-handler';

export function Layout({
  children,
  layoutType,
}: {
  children: JSX.Element;
  layoutType: LAYOUT_TYPE;
}): JSX.Element {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

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
              <SubscriptionCheckMiddleware>
                {children}
              </SubscriptionCheckMiddleware>
            </CustomerRegistrationCheckMiddleware>
          </PageLayout>
        );

      case LAYOUT_TYPE.PDF_VIEWER:
        return (
          /*Middlewares*/
          <CustomerRegistrationCheckMiddleware>
            <SubscriptionCheckMiddleware>
              <PDFViewerLayout>{children}</PDFViewerLayout>
            </SubscriptionCheckMiddleware>
          </CustomerRegistrationCheckMiddleware>
        );

      case LAYOUT_TYPE.BRAND_FILES:
        return (
          /*Middlewares*/
          <CustomerRegistrationCheckMiddleware>
            <SubscriptionCheckMiddleware>
              <BrandFilesLayout navbar={mainNavbar}>
                {children}
              </BrandFilesLayout>
            </SubscriptionCheckMiddleware>
          </CustomerRegistrationCheckMiddleware>
        );
    }
  };

  return (
    /*Providers for context*/
    <AuthenticationProvider>
      <UserInfoProvider>
        {/* Main page layout or loading (needed to wait correct JWT) */}
        {isLoadingJWTToken ? <PageLoader /> : <LayoutToApply />}
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
