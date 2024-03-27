/**
 * Authentication context type
 */
type AuthenticationContextType = {
  /**
   * JWT token
   */
  token: string | null;

  /**
   * JWT Refresh token
   */
  refreshToken: string | null;

  /**
   * Check if JWT is valid
   */
  isJWTValid: boolean;

  /**
   * Do login function
   *
   * @note This function ONLY sets the tokens in the state. NOT ENDPOINTS
   *
   * @param token - JWT token
   * @param refreshToken - JWT refresh token
   */
  doLogin: (token: string, refreshToken: string) => void;

  /**
   * Do logout function
   *
   * @note This function ONLY removes the tokens from the state. NOT ENDPOINTS
   */
  doLogout: () => void;
};

export { type AuthenticationContextType };
