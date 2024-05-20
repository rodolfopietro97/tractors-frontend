import { faKitMedical } from '@fortawesome/free-solid-svg-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { passwordResetFetcher } from '@/fetchers';
import { TextInput } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { FormsLayout } from '..';

/**
 * Inputs type for password recovery form
 */
type PasswordRecoveryFormInputs = {
  email: string;
};

/**
 * Simple password recovery form
 */
function PasswordRecoveryForm(): JSX.Element {
  // Use react-hook-form to manage form state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormInputs>();

  // Errors
  const [passwordRecoveryError, setPasswordRecoveryError] = useState<
    string | null
  >(null);

  // Is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Router
  const router = useRouter();

  // Handle form submit function
  const onSubmit: SubmitHandler<PasswordRecoveryFormInputs> = async (data) => {
    setIsSubmitting(true);
    setPasswordRecoveryError(null);

    const request = await passwordResetFetcher({
      email: data.email,
    });
    const response = await request.json();

    // Validate response
    if (response.detail) {
      setPasswordRecoveryError(null);
      alert(
        "Cambio password avvenuto con successo! Ti è stata inviata un'email di verifica.\nVerrai rediretto al login."
      );
      router.push('/login');
    } else {
      setPasswordRecoveryError(
        response.email ? response.email : 'Errore sconosciuto'
      );
    }

    setIsSubmitting(false);
  };

  return (
    // Main form
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={passwordRecoveryError}>
        {/* Email */}
        <TextInput
          id='email'
          placeholder='Your email'
          type='email'
          label='Email'
          register={register}
          options={{
            required: true,
          }}
          errors={errors}
        />

        {/* Information */}
        <p className='text-justify text-xs text-red-400'>
          * Inserisci l&apos;email del tuo account. Un link per il recupero
          della password ti sarà inviato tramite email
        </p>

        {/* Reset */}
        <Button type='submit' icon={faKitMedical} isLoading={isSubmitting}>
          <span className='mx-2 text-sm'>Recupera Password</span>
        </Button>
      </FormsLayout.Body>
    </form>
  );
}

export { PasswordRecoveryForm };
