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
}: {
  navbar: JSX.Element;
  header: JSX.Element;
  footer: JSX.Element;
  children: JSX.Element;
}): JSX.Element {
  return (
    // Main layout
    <div className='bg-main flex h-screen w-full flex-col justify-center overflow-y-hidden'>
      {/* Navbar */}
      <div className='text-navbarText w-full bg-gradient-to-l from-navbar to-[#144c8f]'>
        {navbar}
      </div>

      {/* Scroll layout */}
      <div className='flex h-auto w-full flex-grow flex-col overflow-y-auto'>
        {/* Header */}
        <div className='text-headerText border-mainBorder h-auto w-full border-b-2 bg-header uppercase'>
          {header}
        </div>

        {/* Content */}
        <div className='flex h-auto w-full flex-grow flex-col items-center justify-center'>
          <div className='container'>{children}</div>
        </div>

        {/* Footer */}
        <div className='border-mainBorder w-full border-2 bg-footer'>
          {footer}
        </div>
      </div>
    </div>
  );
}

export { PageLayout };
