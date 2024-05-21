import { Article } from '@/app/components/Article/Article';
import { ReactElement } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

/**
 * Payment successful page
 */
const PaymentSuccess: NextPageWithLayout = () => {
  return (
    <main>
      <Article border success>
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon boxSize='56px' mr={0} />
          <AlertTitle mt={10} mb={10} fontSize='xl'>
            Pagamento effettuato con successo!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            Il pagamento è andato a buon fine. Ora potrai usufruire dei servizi
            offerti.
          </AlertDescription>
        </Alert>
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
PaymentSuccess.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default PaymentSuccess;
