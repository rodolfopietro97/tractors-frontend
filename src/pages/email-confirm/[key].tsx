import { emailConfirmFetcher } from '@/fetchers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';
import { Article } from '@/app/components/Article';
import {
  Button,
  Checkbox,
  Container,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Email confirmation page
 */
const EmailConfirmation: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // If request is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Email confirmation error
  const [emailConfirmationError, setEmailConfirmationError] =
    useState<string>('');

  // Confirm email function
  const confirmEmail = async () => {
    setIsSubmitting(true);

    const request = await emailConfirmFetcher({
      key: router.query.key as string,
    });
    const response = await request.json();

    // All goes ok
    if (response.detail === 'ok') {
      alert('Email verificata con successo! Verrai reindirizzato al login.');
      router.push('/login');
    }

    // Error
    else {
      setEmailConfirmationError(
        "Errore nel verificare l'email. Probabilmente il link è scaduto oppure l'email è già stata verificata."
      );
    }

    setIsSubmitting(false);
  };

  // Confirm or deny terms
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  return (
    <main>
      <Article border>
        <Container centerContent>
          <Stack spacing={10}>
            <Text>
              Cliccando &quot;Conferma&quot;, registrerai un nuovo account.{' '}
              <br />
              Cio implica l&apos;accettazione:
            </Text>

            <UnorderedList spacing={3}>
              <ListItem>
                Dei nostri{' '}
                <Link className='text-blue-400 hover:underline' href='/terms'>
                  Termini e condizioni
                </Link>
              </ListItem>
              <ListItem>
                Della nostra{' '}
                <Link className='text-blue-400 hover:underline' href='/privacy'>
                  Privacy Policy
                </Link>
              </ListItem>
            </UnorderedList>

            <Container centerContent>
              <Checkbox
                isInvalid
                onChange={(e) => setTermsAccepted(e.target.checked)}
              >
                Confermo di accettare
              </Checkbox>
            </Container>
            <Button
              colorScheme='blue'
              isLoading={isSubmitting}
              size='md'
              onClick={() => confirmEmail()}
              rightIcon={<FontAwesomeIcon icon={faCheck} className='h-4' />}
              isDisabled={!termsAccepted}
            >
              Conferma
            </Button>
          </Stack>
          {emailConfirmationError && (
            <p className='my-5 text-center text-red-500'>
              {emailConfirmationError}
            </p>
          )}
        </Container>
      </Article>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
EmailConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default EmailConfirmation;
