import { Button } from '@/app/catalyst-components/button';
import { createUpdateCompanyFetcher } from '@/fetchers';
import { useAuthentication } from '@/hooks';
import { faBuilding, faEdit, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormsLayout } from '..';
import { Spinner } from '../../Spinner';
import { SelectInput, TextInput } from '../../ui/Input';

/**
 * Inputs type for Company Registrationform
 */
type CompanyRegistrationAndUpdateFormInputs = {
  // Nome azienda
  company_name: string;

  /**
   * Tipologia di azienda (menu a tendina)
   *    - Ricambista
   *    - Azienda agricola
   *    - Concessionario
   *    - Officina meccanica
   *    - Rettifica
   *    - Altro (specificare)
   */
  company_type: string;
  company_type_custom: string;

  // p.iva, pec, codice fiscale, codice univoco
  company_vat_number: string;
  company_pec: string;
  unique_company_code: string;
};

/**
 * Company Registration and update Form component.
 */
function CompanyRegistrationAndUpdateForm({
  update,
  defaultValues,
}: {
  update: boolean;
  defaultValues: CompanyRegistrationAndUpdateFormInputs;
}): JSX.Element {
  // Router
  const router = useRouter();

  // Login errors
  const [companyRegistrationError, setCompanyRegistrationError] = useState<
    string | null
  >(null);

  // If request is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Use react-hook-form to manage form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyRegistrationAndUpdateFormInputs>({
    defaultValues: useMemo<CompanyRegistrationAndUpdateFormInputs>(
      () => defaultValues,
      [defaultValues]
    ),
  });

  // Authentication context
  const { token } = useAuthentication();

  // Handle form submit function
  const onSubmit: SubmitHandler<
    CompanyRegistrationAndUpdateFormInputs
  > = async (data: CompanyRegistrationAndUpdateFormInputs) => {
    // Reset errors and success
    setCompanyRegistrationError(null);
    setIsSubmitting(true);

    const request = await createUpdateCompanyFetcher(
      token as string,
      {
        name: data.company_name,
        type:
          data.company_type === 'altro'
            ? data.company_type_custom
            : data.company_type,
        vat_number: data.company_vat_number,
        pec: data.company_pec,
        unique_company_code: data.unique_company_code,
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
      if (
        JSON.stringify(Object.keys(response)) ===
        JSON.stringify([
          'id',
          'name',
          'type',
          'vat_number',
          'pec',
          'unique_company_code',
        ])
      ) {
        // Clean previous errors
        setCompanyRegistrationError(null);
        alert('Azienda modificata con successo!');
        router.reload();
      } else {
        setCompanyRegistrationError(
          'Errore durante la modifica dei dati. Riprova più tardi.'
        );
      }
    }
    // Registration
    else {
      // Registration successfull
      if (response.status === 'ok') {
        // Clean previous errors
        setCompanyRegistrationError(null);
        alert('Azienda registrata con successo!');
        router.push('/dashboard');
      } else {
        // Already exists company with this vat number (FOR REGISTER)
        if (response.company) setCompanyRegistrationError(response.company[0]);
        else
          setCompanyRegistrationError(
            'Errore durante la registrazione. Riprova più tardi.'
          );
      }
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <FormsLayout.Body error={companyRegistrationError}>
        {/* Wat and Unique company code */}
        <FormsLayout.PairRow>
          <TextInput
            id='company_vat_number'
            type='text'
            label='P.iva'
            register={register}
            options={{
              required: 'Inserisci la partita iva',
            }}
            errors={errors}
          />

          <TextInput
            id='unique_company_code'
            type='text'
            label='Codice univoco'
            register={register}
            options={{
              required: 'Inserisci il codice univoco',
            }}
            errors={errors}
          />
        </FormsLayout.PairRow>

        {/* Pec */}
        <TextInput
          id='company_pec'
          type='email'
          label='Pec azienda'
          register={register}
          options={{
            required: 'Inserisci la pec azienda',
          }}
          errors={errors}
        />

        {/* Company name and Type */}
        <FormsLayout.PairRow>
          <TextInput
            id='company_name'
            type='text'
            label='Nome azienda'
            register={register}
            options={{
              required: 'Inserisci il nome azienda',
            }}
            errors={errors}
          />

          <SelectInput
            id='company_type'
            label='Tipologia azienda'
            register={register}
            selectOptions={[
              { value: 'ricambista', text: 'Ricambista' },
              { value: 'azienda_agricola', text: 'Azienda agricola' },
              { value: 'concessionario', text: 'Concessionario' },
              { value: 'officina_meccanica', text: 'Officina meccanica' },
              { value: 'rettifica', text: 'Rettifica' },
              { value: 'altro', text: 'Altro (specificare)' },
            ]}
            options={{
              required: false,
            }}
          />
        </FormsLayout.PairRow>

        {/* Other company type */}
        <TextInput
          id='company_type_custom'
          type='text'
          label='Specifica la tipologia di azienda'
          register={register}
          options={{
            required:
              watch().company_type === 'altro'
                ? 'Inserisci la tipologia di azienda'
                : false,
          }}
          errors={errors}
          disabled={watch().company_type !== 'altro'}
        />

        {/* Register or Update button */}
        <>
          {update ? (
            // Update button
            <Button
              type='submit'
              disabled={
                JSON.stringify(watch()) === JSON.stringify(defaultValues) ||
                isSubmitting
              }
              color='blue'
            >
              {isSubmitting ? (
                <Spinner size='xxs' />
              ) : (
                <>
                  Aggiorna <FontAwesomeIcon icon={faEdit} className='h-4' />
                </>
              )}
            </Button>
          ) : (
            // Register button
            <Button type='submit' disabled={isSubmitting} color='blue'>
              {isSubmitting ? (
                <Spinner size='xxs' />
              ) : (
                <>
                  Registrati <FontAwesomeIcon icon={faBuilding} />
                </>
              )}
            </Button>
          )}
        </>

        {/* Continue without registering company */}
        <>
          {!update && (
            <Button color='red' onClick={() => router.push('/dashboard')}>
              Non registrare <FontAwesomeIcon icon={faX} />
            </Button>
          )}
        </>
      </FormsLayout.Body>
    </form>
  );
}

export {
  CompanyRegistrationAndUpdateForm,
  type CompanyRegistrationAndUpdateFormInputs,
};
