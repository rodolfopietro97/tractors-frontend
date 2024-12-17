import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

/**
 * Terms page
 */
const Privacy: NextPageWithLayout = () => {
  return (
    <main>
      <Container>
        <p>
          Non c&apos;è nel documento, ma visto che ci sono gli utenti dovrebbe
          esserci qualcosa sulla privacy.
        </p>
      </Container>
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
