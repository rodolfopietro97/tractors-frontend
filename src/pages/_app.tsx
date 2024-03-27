import '../app/globals.css';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

/**
 * Next page with layout.
 * This is a custom type that extends NextPage with a getLayout function.
 *
 * @note This is used to set a layout for each page.
 */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/**
 * App props with layout.
 * This is a custom type that extends AppProps with a Component that has a getLayout function.
 *
 * @note This is used to set a layout for each page.
 */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * Multi layout app.
 *
 * @param Component - Next page component
 * @param pageProps - Next page props
 */
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
