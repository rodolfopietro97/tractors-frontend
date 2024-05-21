import { BrandType } from '.';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Card, CardBody, CardFooter } from '@chakra-ui/card';
import { Image } from '@chakra-ui/image';
import {
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import {
  faCaretDown,
  faCaretUp,
  faFilePdf,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

/**
 * Button of brand list component
 */
function BrandListButton({
  brand,
  categoryFilter,
}: {
  brand: BrandType;
  categoryFilter: string;
}): JSX.Element {
  // Router instance
  const router = useRouter();

  // Show or not brand menu
  const [showBrandMenu, setShowBrandMenu] = useState<boolean>(false);

  // Brand type
  const brandType = useMemo(() => {
    return brand.type.toLowerCase();
  }, [brand.type]);

  /**
   * PDF Catalog button internal component
   */
  const PDFCatalogButton = (
    <IconButton
      size={'lg'}
      icon={<FontAwesomeIcon icon={faFilePdf} className='h-6' />}
      colorScheme={'yellow'}
      aria-label={'PDF Catalog'}
      onClick={() =>
        router.push(`/brand-detail/${brand.name}/${categoryFilter}`)
      }
    >
      <></>
    </IconButton>
  );

  /**
   * Online Catalog button internal component
   */
  const OnlineCatalogButton = (
    <IconButton
      size={'lg'}
      icon={<FontAwesomeIcon icon={faGlobe} className='h-6' />}
      colorScheme={'yellow'}
      aria-label={'Online Catalog'}
      onClick={() => router.push(`/brand-detail-online/${brand.name}`)}
    >
      <></>
    </IconButton>
  );

  return (
    <Card maxW='sm'>
      <CardBody>
        <Stack mt='6' spacing='3'>
          <Container centerContent>
            <Image
              src={brand.image}
              alt={brand.name}
              borderRadius='lg'
              className='max-w-[265px]'
            />
          </Container>
          <Divider />
          <Button
            colorScheme={'blue'}
            onClick={() => setShowBrandMenu(!showBrandMenu)}
            rightIcon={
              <FontAwesomeIcon
                icon={showBrandMenu ? faCaretUp : faCaretDown}
                className='h-4'
              />
            }
          >
            Dettagli
          </Button>
        </Stack>
      </CardBody>
      <CardFooter
        className={clsx({
          invisible: !showBrandMenu,
          visible: showBrandMenu,
        })}
      >
        <Container centerContent>
          <Stack direction={['column', 'row']} spacing='24px'>
            {brandType === 'pdf' && PDFCatalogButton}

            {brandType === 'online' && OnlineCatalogButton}

            {brandType === 'entrambi' && (
              <>
                {PDFCatalogButton}

                {OnlineCatalogButton}
              </>
            )}
          </Stack>
        </Container>
      </CardFooter>
    </Card>
  );
}

/**
 * Simple Brands List component
 */
function BrandsList({
  brands,
  categoryFilter,
}: {
  brands: Array<BrandType>;
  categoryFilter: string;
}): JSX.Element {
  return (
    // Brands list
    <div className='grid grid-cols-1 justify-around gap-2 md:grid-cols-2 lg:grid-cols-3'>
      {brands.map((brand: BrandType, index: number) => {
        return (
          <BrandListButton
            key={index}
            brand={brand}
            categoryFilter={categoryFilter}
          />
        );
      })}
    </div>
  );
}

export { BrandsList };
