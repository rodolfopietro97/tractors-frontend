import { Container } from '@/app/components/Container';
import { CustomerRegistrationAndUpdateForm } from '@/app/components/Forms';
import { useAuthentication } from '@/hooks';
import { useUserInfo } from '@/hooks/userInfo';

/**
 * Middleware to check if the customer is registered or not.
 * If a customer is registered, we can see content,
 * otherwise we can see the registration form.
 */
function CustomerRegistrationCheckMiddleware({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  // Authentication context
  const { token } = useAuthentication();

  // UserInfo context
  const { customerExists } = useUserInfo();

  // If the user is logged in and the customer is not registered
  if (token !== null && !customerExists)
    return (
      <Container>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='my-5 text-2xl'>Manca ancora poco!</h1>
          <p className='my-3 mb-10'>
            Registra ti tuoi dati per poter utilzzare la piattaforma
          </p>

          {/* Main form */}
          <CustomerRegistrationAndUpdateForm
            update={false}
            defaultValues={{
              name: '',
              surname: '',
              fiscal_code: '',
              phone_number: '',
            }}
          />
        </div>
      </Container>
    );

  // Default return the children
  return children;
}

export { CustomerRegistrationCheckMiddleware };
