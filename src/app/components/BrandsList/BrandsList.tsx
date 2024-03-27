import Link from 'next/link';
import { BrandType } from '.';
import { Button } from '@/app/components/ui/Button';
import { useMemo, useState } from 'react';
import clsx from 'clsx';

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
  // Show or not brand menu
  const [showBrandMenu, setShowBrandMenu] = useState<boolean>(false);

  // Brand type
  const brandType = useMemo(() => {
    return brand.type.toLowerCase();
  }, [brand.type]);

  return (
    <div className='flex flex-row justify-center'>
      <div>
        {/*Brand logo button*/}
        <Button
          className='!border-0'
          onClick={() => setShowBrandMenu(!showBrandMenu)}
        >
          <img src={brand.image} alt={brand.name} className='max-w-[265px]' />
        </Button>
        {showBrandMenu && (
          /*Menu for online or PDF brand catalog*/
          <div
            className={clsx({
              'flex flex-col items-center py-2': true,
              invisible: !showBrandMenu,
              'visible py-5': showBrandMenu,
            })}
          >
            {brandType === 'pdf' && (
              <Link
                href={`/brand-detail/${brand.name}/${categoryFilter}`}
                className='my-2 rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700'
              >
                Catalogo PDF
              </Link>
            )}

            {brandType === 'online' && (
              <Link
                href={`/brand-detail-online/${brand.name}`}
                className='my-2 rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700'
              >
                Catalogo Online
              </Link>
            )}

            {brandType === 'entrambi' && (
              <>
                <Link
                  href={`/brand-detail/${brand.name}/${categoryFilter}`}
                  className='my-2 rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700'
                >
                  Catalogo PDF
                </Link>

                <Link
                  href={`/brand-detail-online/${brand.name}`}
                  className='my-2 rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700'
                >
                  Catalogo Online
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
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
