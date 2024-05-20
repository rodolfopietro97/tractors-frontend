import { SubmitHandler, useForm } from 'react-hook-form';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { passwordResetConfirmFetcher } from '@/fetchers';
import { TextInput } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { FormsLayout } from '..';

/**
 * Inputs type for password reset form
 */
type PasswordResetFormInputs = {
  new_password1: string;
  new_password2: string;
};

/**
 * Password reset form.
 *
 * AFTER passrord recovery is done, user is redirected to the page containing this form.
 */
function PasswordResetForm({
  uid,
  token,
}: {
  uid: string;
  token: string;
}): JSX.Element {
  // Use react-hook-form to manage form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetFormInputs>();

  // Is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Password reset error
  const [passwordResetError, setPasswordResetError] = useState<string | null>(
    null
  );

  // Router
  const router = useRouter();

  // Handle form submit function
  const onSubmit: SubmitHandler<PasswordResetFormInputs> = async (
    data: PasswordResetFormInputs
  ) => {
    setIsSubmitting(true);
    setPasswordResetError(null);

    const request = await passwordResetConfirmFetcher({
      new_password1: data.new_password1,
      new_password2: data.new_password2,
      uid: uid,
      token: token,
    });

    const response = await request.json();

    // Reset successfull
    if (
      response.detail &&
      response.detail === 'Password has been reset with the new password.'
    ) {
      // Clean previous errors
      setPasswordResetError(null);
      alert('Password resettata con successo!\nVerrai rediretto al login.');
      router.push('/login');
    } else {
      // Invalid token values
      if (response.token) {
        setPasswordResetError('Token non valido');
      }

      // Invalid password values
      if (response.new_password2 || response.new_password1) {
        setPasswordResetError('Password non valida');
      }
    }

    setIsSubmitting(false);
  };

  return (
    // Main form
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={passwordResetError}>
        {/* Password 1 */}
        <TextInput
          id='new_password1'
          type='password'
          label='Nuova Password'
          register={register}
          options={{
            required: 'Inserisci la nuova password',
          }}
          errors={errors}
        />

        {/* Password 2 */}
        <TextInput
          id='new_password2'
          type='password'
          label='Conferma password'
          register={register}
          options={{
            required: 'Conferma la password',
          }}
          errors={errors}
        />

        <div>
          {watch().new_password1 &&
            watch().new_password2 &&
            watch().new_password1 != watch().new_password2 && (
              <p className='text-xs text-red-400'>
                Le password inserite non combaciano
              </p>
            )}
        </div>

        <Button type='submit' isLoading={isSubmitting} icon={faRefresh}>
          <span className='mx-2 text-sm'>Reset</span>
        </Button>
      </FormsLayout.Body>
    </form>
  );
}

export { PasswordResetForm };
