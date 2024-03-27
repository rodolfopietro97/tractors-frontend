import { Article } from '@/app/components/Article';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';

/**
 * Home page
 */
const Home: NextPageWithLayout = () => {
  return (
    <main>
      <Article>
        <>
          <h1 className='text-2xl'>Home page</h1>
          <p className='my-10'>
            Qui mettiamo qualche grafica carina con le informazioni varie... SAL
            3
          </p>
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
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Home;
