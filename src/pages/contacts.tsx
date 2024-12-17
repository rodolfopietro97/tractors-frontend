import { Container } from '@/app/components/Container';
import { ContactsForm } from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

/**
 * Contacts page
 */
const Contacts: NextPageWithLayout = () => {
  return (
    <main>
      <Container>
        <ContactsForm />
      </Container>
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
