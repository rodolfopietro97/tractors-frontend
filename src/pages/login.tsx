import { Article } from '@/app/components/Article/Article';
import { LoginForm } from '@/app/components/Forms';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import ForgotPassword from '@/pages/forgot-password';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Login page
 */
const Login: NextPageWithLayout = () => {
  return (
    <main>
      <Article>
        <LoginForm />
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Login;
