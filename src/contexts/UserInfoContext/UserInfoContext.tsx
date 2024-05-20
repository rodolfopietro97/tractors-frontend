'use client';
import { createContext, useContext, useMemo } from 'react';
import {
  useCheckCustomerRegistration,
  useCheckCompanyRegistration,
  useGetCompany,
  useGetCustomer,
} from '@/hooks';
import { AuthenticationContext, UserInfoContextContextType } from '..';

/**
 * Authentication context
 */
const UserInfoContextContext = createContext<UserInfoContextContextType>({
  customerExists: false,
  companyExists: false,
  customer: null,
  company: null,
  error: null,
  isLoading: false,
});

/**
 * UserInfo provider
 */
function UserInfoProvider({ children }: { children: JSX.Element }) {
  // Authentication context
  const { token, isJWTValid } = useContext(AuthenticationContext);

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

  // Customer
  const customerExists = useMemo<boolean>(() => {
    // Logged in
    if (
      token !== null &&
      isJWTValid &&
      !checkCustomerError &&
      !checkCustomerIsLoading
    ) {
      return checkCustomerData?.customer_completed_registration;
    }
    return false;
  }, [
    checkCustomerData,
    checkCustomerError,
    checkCustomerIsLoading,
    isJWTValid,
    token,
  ]);

  // Company
  const companyExists = useMemo<boolean>(() => {
    // Logged in
    if (
      token !== null &&
      isJWTValid &&
      !checkCompanyError &&
      !checkCompanyIsLoading
    ) {
      return checkCompanyData?.company_completed_registration;
    }
    return false;
  }, [
    checkCompanyData,
    checkCompanyError,
    checkCompanyIsLoading,
    isJWTValid,
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
        customer: customerExists ? customerData : null,
        company: companyExists ? companyData : null,
        error: error,
        isLoading: isLoading,
      }}
    >
      {children}
    </UserInfoContextContext.Provider>
  );
}

export { UserInfoContextContext, UserInfoProvider };
