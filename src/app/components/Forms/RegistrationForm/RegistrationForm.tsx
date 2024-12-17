import { Button } from '@/app/catalyst-components/button';
import { signUpFetcher } from '@/fetchers';
import {
  Checkbox,
  Container,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormsLayout } from '..';
import { Spinner } from '../../Spinner';
import { TextInput } from '../../ui/Input';

/**
 * Inputs type for Registration form
 */
type RegistrationFormInputs = {
  email: string;

  // Password, verify password
  password: string;
  verify_password: string;
};

/**
 * Simple registration form for user
 */
function RegistrationForm(): JSX.Element {
  // Router
  const router = useRouter();

  // Login errors
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  // If request is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Use react-hook-form to manage form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();

  // Handle form submit function
  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (
    data: RegistrationFormInputs
  ) => {
    // Reset errors and success
    setRegistrationError(null);

    setIsSubmitting(true);
    const request = await signUpFetcher({
      username: data.email,
      email: data.email,
      password1: data.password,
      password2: data.verify_password,
    });
    const response = await request.json();

    // Registration successfull
    if (response.detail && response.detail === 'Verification e-mail sent.') {
      // Clean previous errors
      setRegistrationError(null);
      alert(
        "Registrazione avvenuta con successo! Ti è stata inviata un'email di verifica.\nVerrai rediretto al login."
      );
      router.push('/login');
    } else {
      // Registration errors
      if (response.password1) setRegistrationError(response.password1[0]);
      if (response.email) setRegistrationError(response.email[0]);
      if (response.username) setRegistrationError(response.username[0]);
    }

    setIsSubmitting(false);
  };

  // Confirm or deny terms
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  return (
    // Main form
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={registrationError}>
        {/* Email */}
        <TextInput
          id='email'
          type='text'
          label='Email'
          register={register}
          options={{
            required: "Inserisci l'email",
          }}
          errors={errors}
        />

        {/* Password, verify password */}
        <FormsLayout.PairRow>
          <TextInput
            id='password'
            type='password'
            label='Password'
            register={register}
            options={{
              required: 'Inserisci la password',
            }}
            errors={errors}
          />

          <TextInput
            id='verify_password'
            type='password'
            label='Conferma password'
            register={register}
            options={{
              required: 'Conferma la password',
            }}
            errors={errors}
          />
        </FormsLayout.PairRow>

        <div>
          {watch().password &&
            watch().verify_password &&
            watch().password != watch().verify_password && (
              <p className='text-xs text-red-400'>
                Le password inserite non combaciano
              </p>
            )}
        </div>

        <Text>
          Cliccando &quot;Registra&quot;, registrerai un nuovo account. <br />
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

        {/* Register */}
        <Button
          disabled={!termsAccepted || isSubmitting}
          type='submit'
          color={'lime'}
        >
          {isSubmitting ? (
            <Spinner size='xxs' />
          ) : (
            <>
              Registrati <FontAwesomeIcon icon={faUserPlus} />
            </>
          )}
        </Button>
      </FormsLayout.Body>
    </form>
  );
}

export { RegistrationForm };
