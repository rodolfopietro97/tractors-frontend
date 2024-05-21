import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { Article } from '@/app/components/Article';

/**
 * Terms page
 */
const Terms: NextPageWithLayout = () => {
  return (
    <main>
      <Article border>
        <p>Ci saranno tutti i termini e le condizioni.</p>
      </Article>
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
