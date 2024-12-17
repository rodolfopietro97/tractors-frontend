import { UserInfoContextContext, UserInfoContextContextType } from '@/contexts';
import { useContext } from 'react';

/**
 * Hook to use the customer context
 * @returns The customer context
 */
export function useUserInfo(): UserInfoContextContextType {
  const {
    customerExists,
    companyExists,
    hasSubscription,
    customer,
    company,
    subscription,
    error,
    isLoading,
  } = useContext(UserInfoContextContext);

  return {
    customerExists,
    companyExists,
    hasSubscription,
    customer,
    company,
    subscription,
    error,
    isLoading,
  };
}
