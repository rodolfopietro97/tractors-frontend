import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

/**
 * Terms page
 */
const Terms: NextPageWithLayout = () => {
  return (
    <main>
      <Container>
        <p>Ci saranno tutti i termini e le condizioni.</p>
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Terms.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Terms;
