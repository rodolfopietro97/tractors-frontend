import { Article } from '@/app/components/Article/Article';
import { ContactsForm } from '@/app/components/Forms';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Contacts page
 */
const Contacts: NextPageWithLayout = () => {
  return (
    <main>
      <Article border>
        <ContactsForm />
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Contacts.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Contacts;
