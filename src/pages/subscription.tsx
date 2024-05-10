import { PricingListComponent } from '@/app/components/PricingList/PricingListComponent';
import { ReactElement, useContext, useMemo } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { useSubscription } from '@/hooks';
import { ContentLoading } from '@/app/components/ContentLoading';
import { AuthenticationContext } from '@/contexts';
import {
  SubscriptionHandler,
  SubscriptionType,
} from '@/app/components/Sucscription';

/**
 * Subscription page
 */
const Subscription: NextPageWithLayout = () => {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

  // Get the list of products available
  const { data, error, isLoading } = useSubscription(token as string);

  return (
    <main>
      <ContentLoading isLoading={isLoading || !data} error={error}>
        {/* List of all products */}
        {data && data[0] && (
          <SubscriptionHandler subscription={data[0] as SubscriptionType} />
        )}
      </ContentLoading>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Subscription.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Subscription;
