import { Article } from '@/app/components/Article';
import { BrandType, BrandsList } from '@/app/components/BrandsList';
import { ContentLoading } from '@/app/components/ContentLoading/ContentLoading';
import { useBrandsList } from '@/hooks';
import { ReactElement, useMemo } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Brands catalog for NON logged user page
 */
const BrandsCatalog: NextPageWithLayout = () => {
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
      <Article>
        <ContentLoading
          isLoading={isLoading || !data || !Array.isArray(data)}
          error={error}
        >
          {/* List of all brands */}
          <BrandsList brands={brands} categoryFilter={''} />
        </ContentLoading>
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
BrandsCatalog.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default BrandsCatalog;
