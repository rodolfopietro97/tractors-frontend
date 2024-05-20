import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Import the styles for pdf-viewer. Core and Zoom plugins
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import { RenderZoomInProps, zoomPlugin } from '@react-pdf-viewer/zoom';
import { Button } from '@/app/components/ui/Button';
import { RowColHelper } from '@/app/components/RowColHelper';

import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useFileSignedUrl } from '@/hooks';
import { AuthenticationContext } from '@/contexts';
import { coder } from '@/utils/coder';

const PDFViewer: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Zoom plugin hook
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });

  // Auth context
  const { token, isJWTValid } = useContext(AuthenticationContext);

  // File url
  const fileUrl = useMemo<string | null>(() => {
    if (!router.query.catalogOptions) return null;

    return coder.decode(router.query.catalogOptions[0] as string);
  }, [router.query.catalogOptions]);

  const { data, error, isLoading } = useFileSignedUrl(token, fileUrl);

  return (
    // Main worker
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
      {/*Navbar*/}
      <div onContextMenu={(e) => e.preventDefault()}>
        <RowColHelper
          classNames={[
            'flex flex-row justify-center',
            'flex flex-row justify-center',
          ]}
          className='flex h-[44px] flex-row justify-center border border-gray-200 bg-[#fcfdfe]'
        >
          <zoomPluginInstance.ZoomOut>
            {(props: RenderZoomInProps) => (
              <Button onClick={props.onClick} icon={faMagnifyingGlassMinus} />
            )}
          </zoomPluginInstance.ZoomOut>

          <zoomPluginInstance.ZoomIn>
            {(props: RenderZoomInProps) => (
              <Button onClick={props.onClick} icon={faMagnifyingGlassPlus} />
            )}
          </zoomPluginInstance.ZoomIn>
        </RowColHelper>
      </div>
      {/*PDF Viewer*/}
      <div
        onContextMenu={(e) => e.preventDefault()}
        className='h-[calc(100vh-47px)] bg-[#f7f8fa] py-0'
      >
        {data !== null && data !== undefined && (
          <Viewer fileUrl={decodeURI(data)} plugins={[zoomPluginInstance]} />
        )}
      </div>
    </Worker>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PDFViewer.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PDF_VIEWER}>{page}</Layout>;
};

export default PDFViewer;
