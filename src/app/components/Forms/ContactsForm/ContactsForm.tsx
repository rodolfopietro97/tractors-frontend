import { SubmitHandler, useForm } from 'react-hook-form';
import { faMailForward } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { contactsFormFetcher } from '@/fetchers';
import { TextAreaInput, TextInput } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { FormsLayout } from '..';

/**
 * Inputs type for the contact form
 */
type ContactsFormInputs = {
  email: string;
  name: string;
  surname: string;
  subject: string;
  message: string;
};

/**
 * Contact Form component
 */
function ContactsForm(): JSX.Element {
  // Use react-hook-form to manage form state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactsFormInputs>();

  // Is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Error on sending email
  const [sendEmailError, setSendEmailError] = useState<string>('');

  // Router
  const router = useRouter();

  // Handle form submit function
  const onSubmit: SubmitHandler<ContactsFormInputs> = async (
    data: ContactsFormInputs
  ) => {
    setIsSubmitting(true);
    setSendEmailError('');

    const request = await contactsFormFetcher({
      email: data.email,
      name: data.name,
      surname: data.surname,
      subject: data.subject,
      message: data.message,
    });

    const response = await request.json();

    if (response.status === 'ok') {
      alert('Messaggio inviato correttamente');
      router.push('/');
    } else if (response.status === 'error_confirmation_email')
      setSendEmailError(
        "Errore durante l'invio del messaggio. Controla se l'email inserita è valida."
      );
    else
      setSendEmailError(
        "Errore durante l'invio del messaggio. Riprova più tardi."
      );

    setIsSubmitting(false);
  };

  return (
    // Main form
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={sendEmailError}>
        {/* Name and surname */}
        <FormsLayout.PairRow>
          <TextInput
            id='name'
            label='Nome'
            register={register}
            type='text'
            options={{
              required: 'Inserisci il tuo nome',
            }}
            errors={errors}
          />

          <TextInput
            id='surname'
            label='Cognome'
            register={register}
            type='text'
            options={{
              required: 'Inserisci il tuo cognome',
            }}
            errors={errors}
          />
        </FormsLayout.PairRow>

        {/* Email */}
        <TextInput
          id='email'
          label='Email'
          register={register}
          type='email'
          options={{
            required: 'Inserisci la tua email',
          }}
          errors={errors}
        />

        {/* Subject */}
        <TextInput
          id='subject'
          label='Oggetto'
          register={register}
          type='text'
          options={{
            required: "Inserisci l'oggetto",
          }}
          errors={errors}
        />

        {/* Message */}
        <TextAreaInput
          id='message'
          label='Messaggio'
          register={register}
          options={{
            required: 'Inserisci il messaggio',
          }}
          errors={errors}
        />

        {/* Submit */}
        <Button type='submit' icon={faMailForward} isLoading={isSubmitting}>
          <span className='mx-2 text-sm'>Invia</span>
        </Button>
      </FormsLayout.Body>
    </form>
  );
}

export { ContactsForm };
