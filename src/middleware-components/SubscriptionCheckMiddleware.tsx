import { useContext } from 'react';
import { UserInfoContextContext } from '@/contexts';
import { MiddlewareSkeleton } from '@/middleware-components/MiddlewareSkeleton';
import { Alert, AlertIcon, Container, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';

function SubscriptionCheckMiddleware({ children }: { children: JSX.Element }) {
  // UserInfo context
  const { hasSubscription } = useContext(UserInfoContextContext);

  // If the user has a subscription, show the children
  return (
    <MiddlewareSkeleton
      loggedInChildren={
        <>
          {hasSubscription ? (
            <>{children}</>
          ) : (
            <>
              {/*Subscribe to see this content*/}
              {/*  TODO: Check if subscription will due soon*/}
              <SimpleGrid columns={1}>
                {/*Alert*/}
                <Alert status='error' mt={10}>
                  <AlertIcon />
                  Stai usando la versione gratuita di prova, per vedere tutti i
                  contenuti devi&nbsp;
                  <Link
                    className='text-blue-400 hover:underline'
                    href={'/pricing'}
                  >
                    sottoscrivere un abbonamento.
                  </Link>
                </Alert>
                {/*Children*/}
                {children}
              </SimpleGrid>
            </>
          )}
        </>
      }
      notLoggedInChildren={children}
    />
  );
}

export { SubscriptionCheckMiddleware };
