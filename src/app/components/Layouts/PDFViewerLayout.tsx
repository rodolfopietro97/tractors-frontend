/**
 * Default PDF Viewer page layout
 *
 * This is the default layout for PDF Viewer page.
 */
function PDFViewerLayout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    // Main layout
    <div className='fixed flex h-screen w-screen flex-1 flex-col'>
      {children}
    </div>
  );
}

export { PDFViewerLayout };
