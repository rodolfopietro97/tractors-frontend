import { Article } from '@/app/components/Article/Article';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { Button } from '@chakra-ui/react';

/**
 * Payment successfully page
 */
const PaymentSuccess: NextPageWithLayout = () => {
  return (
    <main>
      <Article>
        <>
          <Button colorScheme='blue'>Button</Button>
          <h1>Payment successfully</h1>
        </>
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PaymentSuccess.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PaymentSuccess;
