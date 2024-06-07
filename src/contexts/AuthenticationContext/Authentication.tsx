'use client';
import { tokenVerifyFetcher } from '@/fetchers';
import { createContext, useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { AuthenticationContextType } from '@/contexts';
import { useAuthenticationStore } from '@/hooks/store';
import { useTokenRefresh } from '@/hooks';

/**
 * Refresh interval in seconds
 */
const REFRESH_INTERVAL_IN_SECONDS: number = 10;

/**
 * Authentication context
 */
const AuthenticationContext = createContext<
  Omit<AuthenticationContextType, 'refreshToken'>
>({
  token: null,

  doLogin: (token: string, refreshToken: string) => {},
  doLogout: () => {},
});

/**
 * Authentication provider
 */
function AuthenticationProvider({ children }: { children: JSX.Element }) {
  // Authentication store
  const authenticationStore = useAuthenticationStore();

  // JWT Token valid or not or checking (null)
  const [isJWTValid, setIsJWTValid] = useState<boolean | null>(null);

  // Token refresh swr hook
  const { data: tokenRefreshData } = useTokenRefresh(
    authenticationStore.refreshToken,
    isJWTValid
  );

  /**
   * Set new authentication tokens:
   *
   * Every time by using the token refresh hook.
   */
  useEffect(() => {
    if (
      isJWTValid === true &&
      authenticationStore.token !== null &&
      authenticationStore.refreshToken !== null &&
      tokenRefreshData !== undefined &&
      tokenRefreshData.access !== undefined
    )
      authenticationStore.doLogin(
        tokenRefreshData.access,
        authenticationStore.refreshToken as string
      );
  }, [tokenRefreshData]);

  /**
   * Check if JWT token is valid:
   *
   * Every time the token changes.
   */
  useEffect(() => {
    // Token is not null
    if (authenticationStore.token !== null) {
      // Verify if token is valid or invalid/expired
      tokenVerifyFetcher({ token: authenticationStore.token }).then(
        (response) => {
          // await response.json()
          response.json().then((json) => {
            // JWT is valid - Set state
            if (Object.keys(json).length === 0) {
              return setIsJWTValid(true);
            }
            // JWT is invalid or expired - Logout is performed
            else {
              setIsJWTValid(false);
            }
          });
        }
      );
    }
    // If the token is null, set state to null
    else {
      setIsJWTValid(null);
    }
  }, [authenticationStore.token]);

  /**
   * If the token is:
   *
   * PRESENT BUT INVALID,
   * THEN, do the logout.
   */
  useEffect(() => {
    if (isJWTValid === false && authenticationStore.token !== null) {
      authenticationStore.doLogout();
    }
  });

  /**
   * Logger to see authentication data
   */
  const AuthLogger = (
    <>
      <p className='text-sm'>
        {isJWTValid === null && 'JWT Validity: Checking...'}
      </p>
      <p className='text-sm'>
        {isJWTValid !== null &&
          (isJWTValid === true ? 'JWT Valid' : 'JWT Invalid')}
      </p>

      <p className='text-sm'>
        Token:{' '}
        {authenticationStore.token === null
          ? 'null'
          : authenticationStore.token}
      </p>
      <p className='text-sm'>
        Refresh Token:{' '}
        {authenticationStore.refreshToken === null
          ? 'null'
          : authenticationStore.refreshToken}
      </p>
    </>
  );

  return (
    <AuthenticationContext.Provider
      value={{
        token: authenticationStore.token,
        doLogin: authenticationStore.doLogin,
        doLogout: authenticationStore.doLogout,
      }}
    >
      <>
        {/*Uncomment the following lines to see the token data*/}
        {/*{AuthLogger}*/}
        {children}
      </>
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext, AuthenticationProvider };
