/**
 * Default page layout.
 *
 * This is the default layout for all pages (except PDF viewer).
 */
function PageLayout({
  navbar,
  header,
  footer,
  children,
  showHeader,
}: {
  navbar: JSX.Element;
  header: JSX.Element;
  footer: JSX.Element;
  children: JSX.Element;
  showHeader: boolean;
}): JSX.Element {
  return (
    // Main layout
    <div className='flex h-screen w-full flex-col justify-center overflow-y-hidden bg-main'>
      {/* Navbar */}
      <div className='w-full bg-navbar text-navbarText'>{navbar}</div>

      {/* Scroll layout */}
      <div className='flex h-auto w-full flex-grow flex-col overflow-y-auto'>
        {/* Header (IF PRESENT) */}
        {showHeader && (
          <div className='h-auto w-full border-b-2 border-mainBorder bg-header uppercase text-headerText'>
            {header}
          </div>
        )}

        {/* Content */}
        <div className='flex h-auto w-full flex-grow flex-col items-center justify-center'>
          <div className='container'>{children}</div>
        </div>

        {/* Footer */}
        <div className='w-full border-2 border-mainBorder bg-footer'>
          {footer}
        </div>
      </div>
    </div>
  );
}

export { PageLayout };
