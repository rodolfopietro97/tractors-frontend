import { ReactElement, useContext } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { useSubscription } from '@/hooks';
import { AuthenticationContext } from '@/contexts';
import {
  SubscriptionHandler,
  SubscriptionType,
} from '@/app/components/Sucscription';
import { Article } from '@/app/components/Article';

/**
 * Subscription page
 */
const Subscription: NextPageWithLayout = () => {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

  // Get the list of products available
  const { data, error, isLoading } = useSubscription(token);

  return (
    <main>
      <Article isLoading={isLoading || !data} error={error} border>
        {/* List of all products */}
        {data && data[0] && (
          <SubscriptionHandler subscription={data[0] as SubscriptionType} />
        )}
      </Article>
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
