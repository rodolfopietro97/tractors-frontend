import { Container } from '@/app/components/Container';
import { CompanyRegistrationAndUpdateForm } from '@/app/components/Forms';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';
import { UserInfoContextContext } from '@/contexts/UserInfoContext';
import { useAuthentication } from '@/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';

/**
 * Registration page
 */
const RegisterCompany: NextPageWithLayout = () => {
  // UserInfo context
  const { companyExists, customerExists } = useContext(UserInfoContextContext);

  // Authentication hook
  const { token } = useAuthentication();

  // Router instance
  const router = useRouter();

  // Redirect to login page if the user is NOT logged in
  useEffect(() => {
    if (token === null) router.push('/login');
  }, [token]);

  return (
    <main>
      <Container>
        <>
          {companyExists ? (
            // Company already registered
            <>
              <h1 className='my-5 text-2xl'>
                Hai già registrato la tua company!
              </h1>
            </>
          ) : (
            // Company NOT already registered
            <>
              {/* To have a company customer MUST be registered (TO BE SUPER PRECISE; MIDDLEWARE ALREADY OBSCURE THIS PART) */}
              {customerExists ? (
                <>
                  <h1 className='my-5 text-2xl'>
                    Registra i tuoi dati aziendali!
                  </h1>
                  <p className='my-3 mb-10'>
                    Compila solo se hai oppure fai parte di un&apos;azienda
                  </p>
                  <CompanyRegistrationAndUpdateForm
                    update={false}
                    defaultValues={{
                      company_name: '',
                      company_type: 'ricambista',
                      company_type_custom: '',

                      company_vat_number: '',
                      company_pec: '',
                      unique_company_code: '',
                    }}
                  />
                </>
              ) : (
                <h1 className='my-5 text-2xl'>
                  Hai già registrato la tua company!
                </h1>
              )}
            </>
          )}
        </>
      </Container>
    </main>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
RegisterCompany.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default RegisterCompany;
