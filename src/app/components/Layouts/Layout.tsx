import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Navbar } from '@/app/components/Navbar';
import { AuthenticationProvider, UserInfoProvider } from '@/contexts';
import {
  PageLayout,
  LAYOUT_TYPE,
  PDFViewerLayout,
} from '@/app/components/Layouts';
import { CustomerRegistrationCheckMiddleware } from '@/middleware-components';

export function Layout({
  children,
  layoutType,
}: {
  children: JSX.Element;
  layoutType: LAYOUT_TYPE;
}): JSX.Element {
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
          /*Middlewares*/
          <CustomerRegistrationCheckMiddleware>
            <PDFViewerLayout>{children}</PDFViewerLayout>
          </CustomerRegistrationCheckMiddleware>
        );
    }
  };

  return (
    /*Providers for context*/
    <AuthenticationProvider>
      <UserInfoProvider>
        {/* Main page layout */}
        <LayoutToApply />
      </UserInfoProvider>
    </AuthenticationProvider>
  );
}
