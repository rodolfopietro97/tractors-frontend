import { Button } from '@/app/catalyst-components/button';
import { loginFetcher } from '@/fetchers';
import { useAuthentication } from '@/hooks';
import {
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormsLayout } from '..';
import { Spinner } from '../../Spinner';
import { TextInput } from '../../ui/Input';

/**
 * Inputs type for login form
 */
type LoginFormInputs = {
  email: string;
  password: string;
};

/**
 * Simple login form
 */
function LoginForm(): JSX.Element {
  // Use react-hook-form to manage form state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Handle form submit function
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);

    const request = await loginFetcher({
      username: data.email,
      email: data.email,
      password: data.password,
    });
    const response = await request.json();

    // Set JWT token
    if (response.access && response.refresh)
      doLogin(response.access, response.refresh);
    // Error
    else {
      if (response['non_field_errors'])
        setLoginError(response['non_field_errors'][0]);
      else setLoginError('Errore sconosciuto');
    }

    setIsSubmitting(false);
  };

  // If request is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Login token. No token means no logged in user
  const { doLogin } = useAuthentication();

  // Login errors
  const [loginError, setLoginError] = useState<string | null>(null);

  // Router
  const router = useRouter();

  return (
    // Main form
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={loginError}>
        {/* Email */}
        <TextInput
          id='email'
          type='email'
          label='Email'
          register={register}
          options={{
            required: "Devi inserire l'email",
          }}
          errors={errors}
        />

        {/* Password */}
        <TextInput
          id='password'
          type='password'
          label='Password'
          register={register}
          options={{
            required: 'Devi inserire la password',
          }}
          errors={errors}
        />

        {/* Recovery link */}
        <Link
          className='text-xs text-blue-400 hover:underline'
          href='/forgot-password'
        >
          Forgot your password?
        </Link>

        {/* Submit buttons */}
        <FormsLayout.PairRow>
          {/* Register */}
          <Button color={'lime'} onClick={() => router.push('/register')}>
            Registrati <FontAwesomeIcon icon={faUserPlus} />
          </Button>

          {/* Login */}
          <Button disabled={isSubmitting} type='submit' color={'white'}>
            {isSubmitting ? (
              <Spinner size='xxs' />
            ) : (
              <>
                Login <FontAwesomeIcon icon={faRightToBracket} />
              </>
            )}
          </Button>
        </FormsLayout.PairRow>
      </FormsLayout.Body>
    </form>
  );
}

export { LoginForm };
