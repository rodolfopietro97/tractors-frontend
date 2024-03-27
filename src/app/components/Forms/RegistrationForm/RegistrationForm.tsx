import { SubmitHandler, useForm } from 'react-hook-form';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ENDPOINTS, signUpFetcher } from '@/fetchers';
import { TextInput } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { FormsLayout } from '..';

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
    const request = await signUpFetcher(ENDPOINTS.user_register, {
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

        {/* Register */}
        <Button type='submit' isLoading={isSubmitting} icon={faUserPlus}>
          <span className='mx-2 text-sm'>Register</span>
        </Button>
      </FormsLayout.Body>
    </form>
  );
}

export { RegistrationForm };
