import { Article } from '@/app/components/Article/Article';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Payment failure page
 */
const PaymentFailure: NextPageWithLayout = () => {
  return (
    <main>
      <Article>
        <h1>Payment failed</h1>
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PaymentFailure.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PaymentFailure;
