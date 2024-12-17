import { Button } from '@/app/catalyst-components/button';
import { useAuthentication } from '@/hooks';
import { faFilePdf, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useMemo } from 'react';
import { BrandType } from '.';

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
  // Authentication hook
  const { token } = useAuthentication();

  // Brand type
  const brandType = useMemo(() => {
    return brand.type.toLowerCase();
  }, [brand.type]);

  /**
   * PDF Catalog button internal component
   */
  const PDFCatalogButton = (
    <Link
      href={
        token !== null
          ? `/brand-detail/${brand.name}/${categoryFilter}`
          : '/pricing'
      }
      target='_blank'
    >
      <Button color='yellow'>
        <FontAwesomeIcon icon={faFilePdf} className='h-6' />
      </Button>
    </Link>
  );

  /**
   * Online Catalog button internal component
   */
  const OnlineCatalogButton = (
    <Link
      href={token !== null ? `/brand-detail-online/${brand.name}` : '/pricing'}
      target='_blank'
    >
      <Button color='yellow'>
        <FontAwesomeIcon icon={faGlobe} className='h-6' />
      </Button>
    </Link>
  );

  return (
    <li className='col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow'>
      <div className='flex flex-1 flex-col p-8'>
        <img
          src={brand.image}
          alt={brand.name}
          className='size-32 mx-auto shrink-0 rounded-full'
        />
        {/* <h3 className='mt-6 text-sm font-medium text-gray-900'>Nome</h3> */}
        {/* <dl className='mt-1 flex grow flex-col justify-between'>
          <dt className='sr-only'>Title</dt>
          <dd className='text-sm text-gray-500'>Titolo</dd>
          <dt className='sr-only'>Role</dt>
          <dd className='mt-3'>
            <span className='inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
              Ruolo
            </span>
          </dd>
        </dl> */}
      </div>
      <div>
        <div className='flex flex-row items-center justify-evenly py-2'>
          {brandType === 'pdf' && PDFCatalogButton}

          {brandType === 'online' && OnlineCatalogButton}

          {brandType === 'entrambi' && (
            <>
              {PDFCatalogButton}
              {OnlineCatalogButton}
            </>
          )}
        </div>
      </div>
    </li>
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
    <ul
      role='list'
      className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    >
      {brands.map((brand: BrandType, index: number) => {
        return (
          <BrandListButton
            key={index}
            brand={brand}
            categoryFilter={categoryFilter}
          />
        );
      })}
    </ul>
  );
}

export { BrandsList };
