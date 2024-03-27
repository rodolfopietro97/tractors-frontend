import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { conditionalRedirect } from '@/utils';
import { AuthenticationContext } from '.';

/**
 * Handle redirect after authentication
 */
function RedirectHandler({ children }: { children: JSX.Element }) {
  // Authentication context
  const { isJWTValid, token, refreshToken } = useContext(AuthenticationContext);

  // Router
  const router = useRouter();

  // Redirect to login page if JWT is invalid
  useEffect(
    () => conditionalRedirect(isJWTValid, router),
    [isJWTValid, token, refreshToken, router]
  );

  // Return children
  return <>{children}</>;
}

export { RedirectHandler };
