import { Button } from '@/app/catalyst-components/button';
import { BrandOnlineCredentialsContentData } from '@/app/components/BrandOnlineContent/types.d';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

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
          <Button color='white' type='submit'>
            <FontAwesomeIcon icon={faGlobe} className='h-4' />
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
