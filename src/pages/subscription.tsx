import { ReactElement, useContext } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { UserInfoContextContext } from '@/contexts';
import {
  SubscriptionHandler,
  SubscriptionType,
} from '@/app/components/Sucscription';
import { Article } from '@/app/components/Article';

/**
 * Subscription page
 */
const Subscription: NextPageWithLayout = () => {
  // UserInfo context
  const { subscription } = useContext(UserInfoContextContext);

  return (
    <main>
      <Article border>
        <SubscriptionHandler subscription={subscription} />
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
