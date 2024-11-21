import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useMemo } from 'react';
import { AuthenticationContext } from '@/contexts';
import { useBrandFilesList } from '@/hooks';
import { API_URL } from '@/fetchers';
import { BrandFilesType } from '@/app/components/BrandsList';
import { TreeView } from '@/app/components/TreeView';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { Article } from '@/app/components/Article';

/**
 * Brand detail page
 */
const BrandDetail: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Auth context
  const { token } = useContext(AuthenticationContext);

  // Brand name
  const brandName = useMemo<string | null>(() => {
    if (!router.query.brandDetailOptions) return null;
    return router.query.brandDetailOptions[0] as string;
  }, [router.query.brandDetailOptions]);

  // Brand category from query string filter
  const brandCategoryFromFilter = useMemo<string>(() => {
    if (!router.query.brandDetailOptions) return '';
    return router.query.brandDetailOptions[1] as string;
  }, [router.query.brandDetailOptions]);

  // Get brand files
  const { data, error, isLoading } = useBrandFilesList(token, brandName);

  /**
   * Files list from API data. Array of strings e.g. ["file1", "file2", "file3"]. It filters files by category given into url query string.
   */
  const ordereFilesListFilteredByCategory: string[] = useMemo<string[]>(() => {
    // Check if data is valid
    if (!data || !Array.isArray(data)) return [];

    // Return files list
    return data
      .map((brandFile: BrandFilesType) => {
        return decodeURI(
          brandFile.file.replace(`${API_URL}/uploads/${brandName}`, '')
        );
      })
      .filter((brandFilePath: string) =>
        brandFilePath.includes(brandCategoryFromFilter)
      )
      .sort();
  }, [data]);

  return (
    <main>
      {ordereFilesListFilteredByCategory.length > 0 && (
        <TreeView paths={ordereFilesListFilteredByCategory} />
      )}
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
BrandDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.BRAND_FILES}>{page}</Layout>;
};

export default BrandDetail;
