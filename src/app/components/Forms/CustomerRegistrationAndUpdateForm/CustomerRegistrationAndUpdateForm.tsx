import { SubmitHandler, useForm } from 'react-hook-form';
import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ENDPOINTS, createUpdateCustomerFetcher } from '@/fetchers';
import { TextInput } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { FormsLayout } from '..';
import { AuthenticationContext } from '@/contexts';

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
  const { token } = useContext(AuthenticationContext);

  // Handle form submit function
  const onSubmit: SubmitHandler<
    CustomerRegistrationAndUpdateFormInputs
  > = async (data: CustomerRegistrationAndUpdateFormInputs) => {
    // Reset errors and success
    setRegistrationError(null);
    setIsSubmitting(true);
    const request = await createUpdateCustomerFetcher(
      update ? ENDPOINTS.update_customer : ENDPOINTS.create_customer,
      token as string,
      {
        name: data.name,
        surname: data.surname,
        fiscal_code: data.fiscal_code,
        phone_number: data.phone_number,
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
    console.log(Object.keys(response));
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

        {/* Fiscal code */}
        <TextInput
          id='fiscal_code'
          type='text'
          maxLength={16}
          label='Codice fiscale'
          register={register}
          options={{
            required: 'Inserisci il codice fiscale',
          }}
          errors={errors}
        />

        {/* Numero */}
        <TextInput
          id='phone_number'
          type='text'
          label='Numero di telefono'
          register={register}
          options={{
            required: 'Inserisci il numero di telefono',
          }}
          errors={errors}
        />

        {/* Register or Update button */}
        <>
          {update ? (
            // Update button
            <Button
              type='submit'
              isLoading={isSubmitting}
              icon={faEdit}
              disabled={
                JSON.stringify(watch()) === JSON.stringify(defaultValues)
              }
            >
              <span className='mx-2 text-sm'>Update</span>
            </Button>
          ) : (
            // Register button
            <Button type='submit' isLoading={isSubmitting} icon={faUserPlus}>
              <span className='mx-2 text-sm'>Register</span>
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
