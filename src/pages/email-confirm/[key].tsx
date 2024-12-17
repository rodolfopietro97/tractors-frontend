import { Button } from '@/app/catalyst-components/button';
import { Container } from '@/app/components/Container';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { Spinner } from '@/app/components/Spinner';
import { emailConfirmFetcher } from '@/fetchers';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import {
  Checkbox,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

/**
 * Email confirmation page
 */
const EmailConfirmation: NextPageWithLayout = () => {
  // Router
  const router = useRouter();

  // Authentication context
  const { token } = useAuthentication();

  // Redirect to brands page if the user is already logged in
  useEffect(() => {
    if (token !== null) router.push('/brands');
  }, [token]);

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
      <Container>
        <>
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

            <Container>
              <Checkbox
                isInvalid
                onChange={(e) => setTermsAccepted(e.target.checked)}
              >
                Confermo di accettare
              </Checkbox>
            </Container>
            <Button
              color='blue'
              onClick={() => confirmEmail()}
              disabled={!termsAccepted || isSubmitting}
            >
              {isSubmitting ? (
                <Spinner size='xxs' />
              ) : (
                <>
                  Conferma <FontAwesomeIcon icon={faCheck} />
                </>
              )}
            </Button>
          </Stack>
          {emailConfirmationError && (
            <p className='my-5 text-center text-red-500'>
              {emailConfirmationError}
            </p>
          )}
        </>
      </Container>
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
