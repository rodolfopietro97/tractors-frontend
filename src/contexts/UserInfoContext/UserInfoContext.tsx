'use client';
import { createContext, useContext, useMemo } from 'react';
import {
  useCheckCustomerRegistration,
  useCheckCompanyRegistration,
  useGetCompany,
  useGetCustomer,
  useSubscription,
  useAuthentication,
} from '@/hooks';
import { AuthenticationContext, UserInfoContextContextType } from '..';

/**
 * Authentication context
 */
const UserInfoContextContext = createContext<UserInfoContextContextType>({
  customerExists: false,
  companyExists: false,
  hasSubscription: false,
  customer: null,
  company: null,
  subscription: null,
  error: null,
  isLoading: false,
});

/**
 * UserInfo provider
 */
function UserInfoProvider({ children }: { children: JSX.Element }) {
  // Authentication context
  const { token } = useAuthentication();

  // Customer (if exists)
  const {
    data: checkCustomerData,
    error: checkCustomerError,
    isLoading: checkCustomerIsLoading,
  } = useCheckCustomerRegistration(token);

  // Company (if exists)
  const {
    data: checkCompanyData,
    error: checkCompanyError,
    isLoading: checkCompanyIsLoading,
  } = useCheckCompanyRegistration(token);

  // Subscription (if exists)
  const {
    data: checkSubscriptionData,
    error: checkSubscriptionError,
    isLoading: checkSubscriptionIsLoading,
  } = useSubscription(token);

  // Customer exists
  const customerExists = useMemo<boolean>(() => {
    // Logged in
    if (token !== null && !checkCustomerError && !checkCustomerIsLoading) {
      return checkCustomerData?.customer_completed_registration;
    }
    return false;
  }, [checkCustomerData, checkCustomerError, checkCustomerIsLoading, token]);

  // Company exists
  const companyExists = useMemo<boolean>(() => {
    // Logged in
    if (token !== null && !checkCompanyError && !checkCompanyIsLoading) {
      return checkCompanyData?.company_completed_registration;
    }
    return false;
  }, [checkCompanyData, checkCompanyError, checkCompanyIsLoading, token]);

  // Subscription exists
  const hasSubscription = useMemo<boolean>(() => {
    // Logged in
    if (
      token !== null &&
      !checkSubscriptionError &&
      !checkSubscriptionIsLoading
    ) {
      return (
        checkSubscriptionData[0] !== undefined &&
        checkSubscriptionData[0] !== null
      );
    }
    return false;
  }, [
    checkSubscriptionData,
    checkSubscriptionError,
    checkSubscriptionIsLoading,
    token,
  ]);

  // Customer data
  const {
    data: customerData,
    error: customerError,
    isLoading: customerIsLoading,
  } = useGetCustomer(token, customerExists);

  // Company data
  const {
    data: companyData,
    error: companyError,
    isLoading: companyIsLoading,
  } = useGetCompany(token, companyExists);

  // Track errors
  const error = useMemo<string | null>(() => {
    if (
      checkCustomerError ||
      checkCompanyError ||
      customerError ||
      companyError
    ) {
      return 'Errore generico. Si prega di riprovare più tardi.';
    }
    return null;
  }, [checkCustomerError, checkCompanyError, customerError, companyError]);

  // Check if loading
  const isLoading = useMemo<boolean>(() => {
    return (
      checkCustomerIsLoading ||
      checkCompanyIsLoading ||
      checkCustomerData?.code === 'token_not_valid' ||
      checkCompanyData?.code === 'token_not_valid' ||
      customerIsLoading ||
      customerData?.code === 'token_not_valid' ||
      companyIsLoading ||
      companyData?.code === 'token_not_valid'
    );
  }, [
    checkCustomerIsLoading,
    checkCompanyIsLoading,
    customerIsLoading,
    companyIsLoading,
  ]);

  return (
    <UserInfoContextContext.Provider
      value={{
        customerExists: customerExists,
        companyExists: companyExists,
        hasSubscription: hasSubscription,
        customer: customerExists ? customerData : null,
        company: companyExists ? companyData : null,
        subscription: hasSubscription ? checkSubscriptionData[0] : null,
        error: error,
        isLoading: isLoading,
      }}
    >
      {children}
    </UserInfoContextContext.Provider>
  );
}

export { UserInfoContextContext, UserInfoProvider };
