import { Button } from '@/app/components/ui/Button/Button';
import { ENDPOINTS, emailConfirmFetcher } from '@/fetchers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { NextPageWithLayout } from '@/pages/_app';

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

    const request = await emailConfirmFetcher(ENDPOINTS.email_confirm, {
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

  return (
    <main>
      Cliccando conferma, accetti i nostri{' '}
      <Link className='text-blue-400 hover:underline' href='/terms'>
        Termini e condizioni
      </Link>{' '}
      e la nostra{' '}
      <Link className='text-blue-400 hover:underline' href='/privacy'>
        Privacy Policy
      </Link>
      .<br />
      <br />
      E registri un nuovo account.
      <br />
      <Button isLoading={isSubmitting} onClick={() => confirmEmail()}>
        Conferma
      </Button>
      {emailConfirmationError && (
        <p className='my-5 text-center text-red-500'>
          {emailConfirmationError}
        </p>
      )}
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
