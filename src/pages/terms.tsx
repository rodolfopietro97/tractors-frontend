import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import RegisterCompany from '@/pages/register-company';
import { NextPageWithLayout } from '@/pages/_app';

/**
 * Terms page
 */
const Terms: NextPageWithLayout = () => {
  return <main>Ci saranno tutti i termini e le condizioni.</main>;
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Terms.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Terms;
