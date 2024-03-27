import { PricingListComponent } from '@/app/components/PricingList/PricingListComponent';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Pricing page
 */
const Pricing: NextPageWithLayout = () => {
  return (
    <main>
      <PricingListComponent monthlyPrice={9.99} annualPrice={99.99} />
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Pricing.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Pricing;
