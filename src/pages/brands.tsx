import { Article } from '@/app/components/Article';
import { BrandType } from '@/app/components/BrandsList';
import { useBrandsList } from '@/hooks';
import { ReactElement, useMemo } from 'react';
import { BrandsListWithFilters } from '@/app/components/BrandsList/BrandsListWithFilters';
import { NextPageWithLayout } from '@/pages/_app';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';

/**
 * Brands catalog for logged user page
 */
const Brands: NextPageWithLayout = () => {
  // User details
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
      <Article
        isLoading={isLoading || !data || !Array.isArray(data)}
        error={error}
        border
      >
        {/* List of all brands */}
        <BrandsListWithFilters brands={brands} />
      </Article>
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
