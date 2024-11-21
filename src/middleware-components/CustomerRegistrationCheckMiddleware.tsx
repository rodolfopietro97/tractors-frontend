import { useContext } from 'react';
import { UserInfoContextContext } from '@/contexts';
import { Article } from '@/app/components/Article';
import { CustomerRegistrationAndUpdateForm } from '@/app/components/Forms';
import { MiddlewareSkeleton } from '@/middleware-components/MiddlewareSkeleton';

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
  // UserInfo context
  const { customerExists } = useContext(UserInfoContextContext);

  return (
    <MiddlewareSkeleton
      loggedInChildren={
        <>
          {customerExists ? (
            // Customer exists (No need to register)
            <>{children}</>
          ) : (
            // Customer does not exist (Need to register)
            <Article>
              <>
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
              </>
            </Article>
          )}
        </>
      }
      notLoggedInChildren={children}
    />
  );
}

export { CustomerRegistrationCheckMiddleware };
