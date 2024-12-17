'use client';

import { Container } from '@/app/components/Container';
import {
  CompanyRegistrationAndUpdateForm,
  CustomerRegistrationAndUpdateForm,
} from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { UserInfoContextContext } from '@/contexts';
import { useAuthentication, useUserDetails } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';

/**
 * Profile page
 */
const Profile: NextPageWithLayout = () => {
  // Authentication context
  const { token } = useAuthentication();

  // UserInfo context
  const { customer, company, customerExists, companyExists } = useContext(
    UserInfoContextContext
  );

  // Router instance
  const router = useRouter();

  // Redirect to login page if the user is NOT logged in
  useEffect(() => {
    if (token === null) router.push('/login');
  }, [token]);

  // User details
  const { data, error, isLoading } = useUserDetails(token);

  return (
    <main>
      <div>
        <Container
          isLoading={isLoading || data?.code == 'token_not_valid'}
          error={error}
        >
          <>
            {data?.email && customerExists && customer && (
              <>
                <h1 className='my-10 text-center text-2xl'>
                  Welcome {data.email}
                </h1>
                <p className='mb-20 text-center'>
                  In questa sezione potrai modificare i dati del tuo probilo e
                  della tua azienda (se ne hai una)
                </p>

                {customerExists && customer && (
                  <>
                    <h1 className='my-10 text-center text-2xl'>
                      Cliente {JSON.stringify(customer.name)}
                    </h1>
                    <CustomerRegistrationAndUpdateForm
                      update={true}
                      defaultValues={{
                        name: customer.name,
                        surname: customer.surname,
                        fiscal_code: 'customer.fiscal_code',
                        phone_number: 'customer.phone_number',
                      }}
                    />
                  </>
                )}
                {companyExists && company ? (
                  <>
                    <h1 className='my-10 text-center text-2xl'>
                      Azienda {JSON.stringify(company.name)}
                    </h1>
                    <CompanyRegistrationAndUpdateForm
                      update={true}
                      defaultValues={{
                        company_name: company.name,
                        company_type: [
                          'ricambista',
                          'azienda_agricola',
                          'concessionario',
                          'officina_meccanica',
                          'rettifica',
                          'altro',
                        ].includes(company.type)
                          ? company.type
                          : 'altro',
                        company_type_custom: [
                          'ricambista',
                          'azienda_agricola',
                          'concessionario',
                          'officina_meccanica',
                          'rettifica',
                          'altro',
                        ].includes(company.type)
                          ? ''
                          : company.type,
                        company_vat_number: company.vat_number,
                        company_pec: company.pec,
                        unique_company_code: company.unique_company_code,
                      }}
                    />
                  </>
                ) : (
                  <p className='my-10'>
                    Non hai un&apos;azienda. Clicca{' '}
                    <Link href='/register-company'>qui</Link> per registrarla
                  </p>
                )}
              </>
            )}
          </>
        </Container>
      </div>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Profile;
