import { Article } from '@/app/components/Article/Article';
import { PasswordRecoveryForm } from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Password forgot page
 */
const ForgotPassword: NextPageWithLayout = () => {
  return (
    <main>
      <Article>
        <PasswordRecoveryForm />
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default ForgotPassword;
