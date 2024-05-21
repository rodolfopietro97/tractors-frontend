import { PasswordResetForm } from '@/app/components/Forms';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { Article } from '@/app/components/Article';

/**
 * Email confirmation page
 */
const PasswordResetConfirm: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  return (
    <main>
      <Article
        isLoading={
          router.query.userParameters === undefined ||
          router.query.userParameters[0] == undefined ||
          router.query.userParameters[1] == undefined
        }
        error={
          router.query.userParameters?.length !== 2
            ? 'Link non valido'
            : undefined
        }
        border
      >
        <>
          {router.query.userParameters &&
            router.query.userParameters[0] &&
            router.query.userParameters[1] && (
              <PasswordResetForm
                uid={router.query.userParameters[0] as string}
                token={router.query.userParameters[1] as string}
              />
            )}
        </>
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PasswordResetConfirm.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PasswordResetConfirm;
