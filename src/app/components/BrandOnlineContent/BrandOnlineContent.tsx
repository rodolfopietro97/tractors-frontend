import { Button } from '@/app/components/ui/Button';
import { BrandOnlineCredentialsContentData } from '@/app/components/BrandOnlineContent/types.d';
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
      {brandName.toLowerCase() === 'sdf' && data.credentials.jwt && (
        <form action={data.url}>
          <input type='hidden' name='jwt' value={data.credentials.jwt} />
          <Button type='submit'>Vai al portale</Button>
        </form>
      )}

      {/*Landini, McCormick, Valpadana brands*/}
      {['landini', 'mccormick', 'valpadana'].includes(
        brandName.toLowerCase()
      ) && (
        // <form
        //   action={'https://gate.argotractors.com/portal/index.html#/login'}
        //   method='post'
        // >
        //   <input
        //     type='hidden'
        //     name='username'
        //     value={data.credentials.username}
        //   />
        //   <input
        //     type='hidden'
        //     name='password'
        //     value={data.credentials.password}
        //   />
        //   <Button type='submit'>Vai al portale</Button>
        // </form>
        <>
          <h4>
            Connettiti al sito{' '}
            <Link href={data.url} className='text-blue-500'>
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
