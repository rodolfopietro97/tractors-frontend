import {
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { loginFetcher } from '@/fetchers';
import { TextInput } from '../../ui/Input';
import { FormsLayout } from '..';
import { AuthenticationContext } from '@/contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

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
  const { doLogin } = useContext(AuthenticationContext);

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
          <Button
            rightIcon={<FontAwesomeIcon icon={faUserPlus} className='h-4' />}
            colorScheme={'blackAlpha'}
            onClick={() => router.push('/register')}
          >
            Registra
          </Button>

          {/* Login */}
          <Button
            isLoading={isSubmitting}
            type='submit'
            rightIcon={
              <FontAwesomeIcon icon={faRightToBracket} className='h-4' />
            }
            colorScheme={'blue'}
          >
            <span className='mx-2 text-sm'>Login</span>
          </Button>
        </FormsLayout.PairRow>
      </FormsLayout.Body>
    </form>
  );
}

export { LoginForm };
