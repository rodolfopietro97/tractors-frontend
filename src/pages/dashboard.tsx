'use client';
import { ContentLoading } from '@/app/components/ContentLoading/ContentLoading';
import { RowColHelper } from '@/app/components/RowColHelper';
import { LinkButton } from '@/app/components/ui/Button';
import { AuthenticationContext } from '@/contexts';
import { useUserDetails } from '@/hooks';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useContext } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';

/**
 * Dashboard page
 */
const Dashboard: NextPageWithLayout = () => {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

  // User details
  const { data, error, isLoading } = useUserDetails(token as string);

  return (
    <main>
      <div>
        <ContentLoading
          isLoading={isLoading || data?.code == 'token_not_valid'}
          error={error}
        >
          <>
            {data?.email && (
              <RowColHelper
                className='my-2 flex flex-col'
                classNames={['my-10', 'my-2', 'my-2']}
              >
                <h1 className='text-center text-2xl'>Welcome {data.email}</h1>
                <LinkButton href='/profile' icon={faUser}>
                  <span className='mx-2 text-sm'>Gestisci il tuo profilo</span>
                </LinkButton>
                <LinkButton href='/brands' icon={faBook}>
                  <span className='mx-2 text-sm'>Consulta il catalogo</span>
                </LinkButton>
              </RowColHelper>
            )}
          </>
        </ContentLoading>
      </div>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Dashboard;
