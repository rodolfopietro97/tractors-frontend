import {
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { ENDPOINTS, loginFetcher } from '@/fetchers';
import { TextInput } from '../../ui/Input';
import { Button, LinkButton } from '../../ui/Button';
import { FormsLayout } from '..';
import { AuthenticationContext } from '@/contexts';

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
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Handle form submit function
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);

    const request = await loginFetcher(ENDPOINTS.user_login, {
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
          <LinkButton href='/register' icon={faUserPlus}>
            <span className='mx-2 text-sm'>Register</span>
          </LinkButton>

          {/* Login */}
          <Button
            isLoading={isSubmitting}
            type='submit'
            icon={faRightToBracket}
          >
            <span className='mx-2 text-sm'>Login</span>
          </Button>
        </FormsLayout.PairRow>
      </FormsLayout.Body>
    </form>
  );
}

export { LoginForm };
