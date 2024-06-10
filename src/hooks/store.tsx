import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthenticationContextType } from '@/contexts';

/**
 * Zustand store for authentication.
 *
 * It stores the JWT token and the refresh token.
 * JWT and refresh token can be set with `doLogin` and removed with `doLogout`.
 * They can be "string" or "null".
 */
const useAuthenticationStore = create<AuthenticationContextType>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      doLogin: (token: string, refreshToken: string) =>
        set({
          token: token,
          refreshToken: refreshToken,
        }),
      doLogout: () =>
        set({
          token: null,
          refreshToken: null,
        }),
    }),
    {
      /**
       * name of the item in the storage (must be unique)
       */
      name: 'authentication-storage',
      /**
       * (optional) by default, 'localStorage' is used
       */
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAuthenticationStore };
