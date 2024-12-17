import { Button } from '@/app/catalyst-components/button';
import { createUpdateCustomerFetcher } from '@/fetchers';
import { useAuthentication } from '@/hooks';
import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormsLayout } from '..';
import { Spinner } from '../../Spinner';
import { TextInput } from '../../ui/Input';

/**
 * Inputs type for Customer Registrationform
 */
type CustomerRegistrationAndUpdateFormInputs = {
  // Nome, cognome
  name: string;
  surname: string;

  // codice fiscale
  fiscal_code: string;

  // Telefono, email
  phone_number: string;
};

/**
 * Simple registration and update form for Customer (AFTER user registration)
 */
function CustomerRegistrationAndUpdateForm({
  update,
  defaultValues,
}: {
  update: boolean;
  defaultValues: CustomerRegistrationAndUpdateFormInputs;
}): JSX.Element {
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
  } = useForm<CustomerRegistrationAndUpdateFormInputs>({
    defaultValues: useMemo<CustomerRegistrationAndUpdateFormInputs>(
      () => defaultValues,
      [defaultValues]
    ),
  });

  // Authentication context
  const { token } = useAuthentication();

  // Handle form submit function
  const onSubmit: SubmitHandler<
    CustomerRegistrationAndUpdateFormInputs
  > = async (data: CustomerRegistrationAndUpdateFormInputs) => {
    // Reset errors and success
    setRegistrationError(null);
    setIsSubmitting(true);

    const request = await createUpdateCustomerFetcher(
      token as string,
      {
        name: data.name,
        surname: data.surname,
      },
      update
    );
    const response = await request.json();
    handleResponse(response);

    setIsSubmitting(false);
  };

  /**
   * Handle response from backend
   * @param response Response from backend
   */
  const handleResponse = (response: any) => {
    // Update
    if (update) {
      // @TODO: Improve this check
      if (JSON.stringify(Object.keys(response)).includes('id')) {
        // Clean previous errors
        setRegistrationError(null);
        alert('Cliente modificato con successo!');
        router.reload();
      } else {
        setRegistrationError(
          'Errore durante la modifica dei dati. Riprova più tardi.'
        );
      }
    }
    // Registration
    else {
      // Registration successfull
      if (response.status === 'ok') {
        // Clean previous errors
        setRegistrationError(null);
        alert(
          "Dati aggiornati con successo! Verrai rediretto alla pagina di registrazione dell'azienda.\n(PASSAGGIO OPZIONALE SOLO SE POSSIEDI UN'AZIENDA)"
        );
        router.push('/register-company');
      } else {
        setRegistrationError(
          'Errore durante la registrazione. Riprova più tardi.'
        );
      }
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={registrationError}>
        {/* Name and surname */}
        <FormsLayout.PairRow>
          <TextInput
            id='name'
            type='text'
            label='Nome'
            register={register}
            options={{
              required: 'Inserisci il nome',
            }}
            errors={errors}
          />

          <TextInput
            id='surname'
            type='text'
            label='Cognome'
            register={register}
            options={{
              required: 'Inserisci il cognome',
            }}
            errors={errors}
          />
        </FormsLayout.PairRow>

        {/* Register or Update button */}
        <>
          {update ? (
            // Update button
            <Button
              type='submit'
              color={'blue'}
              disabled={
                JSON.stringify(watch()) === JSON.stringify(defaultValues) ||
                isSubmitting
              }
            >
              {isSubmitting ? (
                <Spinner size='xxs' />
              ) : (
                <>
                  Aggiorna <FontAwesomeIcon icon={faEdit} />
                </>
              )}
            </Button>
          ) : (
            // Register button
            <Button type='submit' disabled={isSubmitting} color={'blue'}>
              {isSubmitting ? (
                <Spinner size='xxs' />
              ) : (
                <>
                  Registrati <FontAwesomeIcon icon={faUserPlus} />
                </>
              )}
            </Button>
          )}
        </>
      </FormsLayout.Body>
    </form>
  );
}

export {
  CustomerRegistrationAndUpdateForm,
  type CustomerRegistrationAndUpdateFormInputs,
};
