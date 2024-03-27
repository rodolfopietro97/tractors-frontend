import { BrandType } from '@/app/components/BrandsList/types.d';
import { BrandsList } from '@/app/components/BrandsList/BrandsList';
import { FormsLayout } from '@/app/components/Forms';
import { Button } from '@/app/components/ui/Button';
import { useMemo, useState } from 'react';
import { faTractor, faWrench } from '@fortawesome/free-solid-svg-icons';

/**
 * Main categories
 */
const categories = [
  { name: 'Trattori', buttonIcon: faTractor },
  { name: 'Attrezzature', buttonIcon: faWrench },
];

/**
 * Simple brands list with filters component
 */
function BrandsListWithFilters({
  brands,
}: {
  brands: Array<BrandType>;
}): JSX.Element {
  // Hook to manage category filter
  const [categoryFilter, setCategoryFilter] = useState<string>(
    categories[0].name
  );

  // Filtered brands
  const filteredBrands = useMemo<Array<BrandType>>(() => {
    return brands.filter((brand: BrandType) =>
      brand.category !== 'Entrambi' ? brand.category === categoryFilter : true
    );
  }, [brands, categoryFilter]);

  return (
    <>
      {/* Filter by category */}
      <FormsLayout.PairRow>
        {categories.map((category) => {
          return (
            <Button
              icon={category.buttonIcon}
              key={category.name}
              onClick={() => setCategoryFilter(category.name)}
            >
              {category.name}
            </Button>
          );
        })}
      </FormsLayout.PairRow>

      {/* List of all brands */}
      <BrandsList brands={filteredBrands} categoryFilter={categoryFilter} />
    </>
  );
}

export { BrandsListWithFilters };
