import { BrandOnlineCredentialsContentData } from '@/app/components/BrandOnlineContent/types.d';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

/**
 * Content for a single brand online
 */
function BrandOnlineContent({
  brandName,
  data,
}: {
  brandName: String;
  data: {
    url: string;
    credentials: BrandOnlineCredentialsContentData;
  };
}) {
  return (
    <div>
      {/*SDF Brand*/}
      {brandName.toLowerCase().includes('sdf') && data.credentials.jwt && (
        <form action={data.url} target='_blank'>
          <input type='hidden' name='jwt' value={data.credentials.jwt} />
          <Button
            leftIcon={<FontAwesomeIcon icon={faGlobe} className='h-4' />}
            colorScheme={'blue'}
            type='submit'
          >
            Vai al portale
          </Button>
        </form>
      )}

      {/*Landini, McCormick, Valpadana brands*/}
      {['landini', 'mccormick', 'valpadana'].includes(
        brandName.toLowerCase()
      ) && (
        <>
          <h4>
            Connettiti al sito{' '}
            <Link href={data.url} className='text-blue-500' target='_blank'>
              {data.url}
            </Link>{' '}
            con le seguenti credenziali:
          </h4>
          <br />
          <p>
            <b>Username</b>: {data.credentials.username}
          </p>
          <p>
            <b>Password</b>: {data.credentials.password}
          </p>
        </>
      )}
    </div>
  );
}

export { BrandOnlineContent };
