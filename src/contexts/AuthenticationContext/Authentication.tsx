'use client';
import { tokenVerifyFetcher } from '@/fetchers';
import { createContext, useEffect, useState } from 'react';
import { AuthenticationContextType } from '@/contexts';
import { useAuthenticationStore } from '@/hooks/store';
import { useTokenRefresh } from '@/hooks';

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
  /**
   *  Authentication store.
   * It is needed to persist the token and refresh token
   */
  const authenticationStore = useAuthenticationStore();

  /**
   * Check if JWT token is valid or not.
   *
   * * True: Valid
   * * False: Invalid
   * * Null: Checking...
   */
  const [isJWTValid, setIsJWTValid] = useState<boolean | null>(null);

  /**
   * SWR hook used to refresh the token every JWT_REFRESH_TIME.
   */
  const { data: tokenRefreshData } = useTokenRefresh(
    authenticationStore.refreshToken,
    isJWTValid
  );

  /**
   * Refresh the token effect.
   *
   * If:
   *
   * * JWT is valid
   * AND
   * * the Refresh token is present
   * AND
   * * the refresh token request is successful,
   *
   * THEN, do the login with the new token.
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
  }, [
    tokenRefreshData,
    authenticationStore.token,
    authenticationStore.refreshToken,
    tokenRefreshData,
  ]);

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
   * Do the logout at the login page if the JWT token is invalid.
   */
  useEffect(() => {
    console.log('isJWTValid', isJWTValid);
    console.log('authenticationStore.token', authenticationStore.token);
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
          : authenticationStore.token.slice(0, 10) + '...'}
      </p>
      <p className='text-sm'>
        Refresh Token:{' '}
        {authenticationStore.refreshToken === null
          ? 'null'
          : authenticationStore.refreshToken.slice(0, 10) + '...'}
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
        {AuthLogger}
        {children}
      </>
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext, AuthenticationProvider };
