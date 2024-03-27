import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Terms page
 */
const Privacy: NextPageWithLayout = () => {
  return (
    <main>
      Non c&apos;è nel documento, ma visto che ci sono gli utenti dovrebbe
      esserci qualcosa sulla privacy.
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Privacy.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Privacy;
