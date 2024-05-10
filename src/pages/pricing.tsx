import { PricingListComponent } from '@/app/components/PricingList/PricingListComponent';
import { ReactElement, useMemo } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { useProductsList } from '@/hooks';
import { ContentLoading } from '@/app/components/ContentLoading';
import {
  PricePlanType,
  ProductFuturePlanType,
} from '@/app/components/PricingList';

/**
 * Pricing page
 */
const Pricing: NextPageWithLayout = () => {
  // Get the list of products available
  const { data, error, isLoading } = useProductsList();

  // Convert the data to the required format
  const products = useMemo<ProductFuturePlanType[] | null>(
    () =>
      data
        ? data.map((product: any) => {
            // Get the price and price id
            const price = String(Number(product.prices[0].unit_amount) / 100);
            const price_id = product.prices[0].id;

            // Return the product in the required format
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image: product.image,
              price: {
                id: price_id,
                price: price,
              },
            } as ProductFuturePlanType;
          })
        : null,
    [data]
  );

  return (
    <main>
      <ContentLoading
        isLoading={isLoading || !data || !Array.isArray(data)}
        error={error}
      >
        {/* List of all products */}
        {data && products && <PricingListComponent productFutures={products} />}
      </ContentLoading>
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
