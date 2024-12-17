import { BrandType } from '@/app/components/BrandsList/types.d';
import { faTractor, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { BrandsList } from '.';
import { Container } from '../Container';

/**
 * Main categories
 */
const categories = [
  { name: 'Trattori', icon: faTractor },
  { name: 'Attrezzature', icon: faWrench },
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
    <Container>
      <TabGroup>
        <TabList className='flex flex-col justify-around py-7 sm:flex-row'>
          {categories.map((category) => (
            <Tab
              key={category.name}
              className={clsx({
                'my-2 rounded-full border border-mainBorder px-4 py-2 text-sm/6 font-semibold text-black hover:bg-gray-200 sm:my-0':
                  true,
                'bg-gray-200': categoryFilter === category.name,
              })}
              onClick={() => setCategoryFilter(category.name)}
            >
              {category.name}
              <FontAwesomeIcon icon={category.icon} className='mx-2' />
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {categories.map((category) => (
            <TabPanel key={category.name}>
              <BrandsList
                brands={filteredBrands}
                categoryFilter={category.name}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Container>
  );
}

export { BrandsListWithFilters };
