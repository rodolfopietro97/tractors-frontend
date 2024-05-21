import { BrandType } from '@/app/components/BrandsList/types.d';
import { BrandsList } from '@/app/components/BrandsList/BrandsList';
import { useMemo, useState } from 'react';
import { faTractor, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, SimpleGrid } from '@chakra-ui/react';

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
    <Container centerContent>
      <Tabs
        className={'w-[300px] sm:w-[500px] md:w-[700px] lg:w-[1000px]'}
        isFitted
      >
        <TabList>
          {categories.map((category) => {
            return (
              <Tab
                key={category.name}
                onClick={() => setCategoryFilter(category.name)}
              >
                <SimpleGrid columns={2} spacingX={3}>
                  {category.name}
                  <FontAwesomeIcon icon={category.buttonIcon} />
                </SimpleGrid>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          <TabPanel>
            <BrandsList brands={filteredBrands} categoryFilter={'Trattori'} />
          </TabPanel>
          <TabPanel>
            <BrandsList
              brands={filteredBrands}
              categoryFilter={'Attrezzature'}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export { BrandsListWithFilters };
