import { AuthenticationContext } from '@/contexts';
import { useContext } from 'react';

/**
 * Hook to use the authentication context
 * @returns The authentication context
 */
export function useAuthentication() {
  const { token, doLogin, doLogout } = useContext(AuthenticationContext);

  return { token, doLogin, doLogout };
}
