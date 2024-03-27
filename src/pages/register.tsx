import { Article } from '@/app/components/Article/Article';
import { RegistrationForm } from '@/app/components/Forms';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import Profile from '@/pages/profile';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Registration page
 */
const Register: NextPageWithLayout = () => {
  return (
    <main>
      <Article>
        <RegistrationForm />
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Register.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Register;
