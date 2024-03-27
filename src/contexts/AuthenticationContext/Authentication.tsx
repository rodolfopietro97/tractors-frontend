'use client';
import { ENDPOINTS, tokenRefreshFetcher, tokenVerifyFetcher } from '@/fetchers';
import { createContext, useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { AuthenticationContextType } from '@/contexts';

/**
 * Refresh interval in seconds
 */
const REFRESH_INTERVAL_IN_SECONDS: number = 5;

/**
 * Authentication context
 */
const AuthenticationContext = createContext<AuthenticationContextType>({
  token: null,
  refreshToken: null,
  isJWTValid: false,

  doLogin: (token: string, refreshToken: string) => {},
  doLogout: () => {},
});

/**
 * Authentication provider
 */
function AuthenticationProvider({ children }: { children: JSX.Element }) {
  /**
   * Do login function
   *
   * @param token - JWT token
   * @param refreshToken - JWT refresh token
   */
  const doLogin = (token: string, refreshToken: string) => {
    // Set tokens in state
    setToken(token);
    setTokenRefreshToken(refreshToken);
  };

  /**
   * Do logout function
   */
  const doLogout = () => {
    // Remove tokens from state
    setToken(null);
    setTokenRefreshToken(null);

    // Remove JWT from secure local storage
    secureLocalStorage.removeItem('token');
    secureLocalStorage.removeItem('refreshToken');
  };

  // Token hook state
  const [token, setToken] = useState<string | null>(null);

  // Refresh token hook state
  const [refreshToken, setTokenRefreshToken] = useState<string | null>(null);

  // Check if JWT is valid hook state
  const [isJWTValid, setIsJWTValid] = useState<boolean>(false);

  /**
   * Effect to check if JWT is valid
   *
   * It is executed every time token or refreshToken changes.
   */
  useEffect(() => {
    // Tokens are present
    if (token && refreshToken) {
      // Verify if token is valid or invalid/expired
      tokenVerifyFetcher(ENDPOINTS.token_verify, { token: token }).then(
        (response) => {
          response.json().then((json) => {
            // JWT is valid - Set state
            if (Object.keys(json).length === 0) setIsJWTValid(true);
            // JWT is invalid or expired - Logout is performed
            else {
              secureLocalStorage.removeItem('token');
              secureLocalStorage.removeItem('refreshToken');
              setIsJWTValid(false);
            }
          });
        }
      );
    }
    // Tokens are NOT present
    else setIsJWTValid(false);
  }, [token, refreshToken]);

  /**
   * Effect to load token from secure local storage.
   *
   * It is executed only once when page is loaded.
   */
  useEffect(() => {
    // Load token from secure local storage
    const _token = secureLocalStorage.getItem('token');
    const _refreshToken = secureLocalStorage.getItem('refreshToken');

    // Secure local storage is not empty
    if (_token && _refreshToken) {
      setToken(_token as string);
      setTokenRefreshToken(_refreshToken as string);
    }
  }, []);

  /**
   * Effect to save token to secure local storage.
   *
   * It is executed every time token or refreshToken changes.
   */
  useEffect(() => {
    if (token && refreshToken) {
      secureLocalStorage.setItem('token', token as string);
      secureLocalStorage.setItem('refreshToken', refreshToken as string);
    }
  }, [token, refreshToken]);

  /**
   * Effect to refresh JWT token.
   */
  useEffect(() => {
    // Refresh interval
    const refreshInterval = setInterval(() => {
      // Refresh if JWT is valid
      if (isJWTValid) {
        tokenRefreshFetcher(ENDPOINTS.token_refresh, {
          refresh: refreshToken as string,
        }).then((response) => {
          response.json().then((jsonResponse) => {
            // Valid token
            if (jsonResponse.access) setToken(jsonResponse.access);
            // Do logout fo every problem
            else doLogout();
          });
        });
      }
    }, 1000 * REFRESH_INTERVAL_IN_SECONDS);

    // Clear interval on unmount
    return () => clearInterval(refreshInterval);
  }, [isJWTValid]);

  return (
    <AuthenticationContext.Provider
      value={{
        token: token as string,
        refreshToken: refreshToken as string,
        isJWTValid: isJWTValid,
        doLogin: doLogin,
        doLogout: doLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext, AuthenticationProvider };
