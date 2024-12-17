import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { ProductFuturePlanType } from '@/app/components/PricingList';
import { PricingListComponent } from '@/app/components/PricingList/PricingListComponent';
import { useProductsList } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useMemo } from 'react';

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
      <Container
        isLoading={isLoading || !data || !Array.isArray(data)}
        error={error}
      >
        {/* List of all products */}
        {data && products && <PricingListComponent productFutures={products} />}
      </Container>
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
