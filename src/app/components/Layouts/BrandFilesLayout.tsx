/**
 * Default brand files page layout.
 *
 * It is needed to show the brand files page.
 */
function BrandFilesLayout({
  navbar,
  children,
}: {
  navbar: JSX.Element;
  children: JSX.Element;
}): JSX.Element {
  return (
    // Main layout
    <div className='flex h-screen w-full flex-col justify-center overflow-y-hidden bg-main'>
      {/* Navbar */}
      <div className='w-full bg-navbar text-navbarText'>{navbar}</div>

      {/* Scroll layout */}
      <div className='flex h-auto w-full flex-grow flex-col overflow-y-auto'>
        {/* Content */}
        <div className='flex h-auto w-full flex-grow flex-col items-center justify-center'>
          {children}
        </div>
      </div>
    </div>
  );
}

export { BrandFilesLayout };
