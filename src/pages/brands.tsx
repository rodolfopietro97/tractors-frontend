import { BrandType } from '@/app/components/BrandsList';
import { BrandsListWithFilters } from '@/app/components/BrandsList/BrandsListWithFilters';
import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { useBrandsList } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement, useMemo } from 'react';

/**
 * Brands catalog for logged user page
 */
const Brands: NextPageWithLayout = () => {
  // Brand list details
  const { data, error, isLoading } = useBrandsList();

  // All brands to fetch
  const brands = useMemo<Array<BrandType>>(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((brand: any) => {
      return {
        name: brand.name,
        image: brand.image,
        category: brand.category,
        type: brand.type,
        brand_online_url: brand.brand_online_url,
      };
    });
  }, [data]);

  return (
    <main>
      <Container
        isLoading={isLoading || !data || !Array.isArray(data)}
        error={error}
      >
        {/* List of all brands */}
        <BrandsListWithFilters brands={brands} />
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Brands.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Brands;
