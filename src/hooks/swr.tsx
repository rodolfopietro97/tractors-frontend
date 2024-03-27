import {
  ENDPOINTS,
  brandFilesFether,
  brandsListFether,
  checkCompanyRegistrationFetcher,
  checkCustomerRegistrationFetcher,
  getCompanyFetcher,
  getCustomerFetcher,
  userDetailsFetcher,
  getBrandOnlineFetcher,
  getFileSignedUrlFetcher,
} from '@/fetchers';
import useSWR from 'swr';

/**
 * Check company registration
 */
function useBrandFilesList(token: string, brandName: string) {
  return useSWR(
    brandName !== undefined ? `${ENDPOINTS.brands_files}${brandName}` : null,
    // @TODO refactor this url unused in all!
    (url: string) =>
      brandFilesFether(`${ENDPOINTS.brands_files}${brandName}`, {
        token: token as string,
      }).then((res) => res.json())
  );
}

/**
 * Fetch the list of Brands
 */
function useBrandsList() {
  return useSWR(
    ENDPOINTS.brands_list,
    (url) => brandsListFether(url).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Check company registration
 */
function useCheckCompanyRegistration(token: string) {
  return useSWR(
    token ? ENDPOINTS.check_company_registration : null,
    (url) =>
      checkCompanyRegistrationFetcher(url, { token: token as string }).then(
        (res) => res.json()
      ),
    { refreshInterval: 3000 }
  );
}

/**
 * Check customer registration
 */
function useCheckCustomerRegistration(token: string) {
  return useSWR(
    token ? ENDPOINTS.check_customer_registration : null,
    (url) =>
      checkCustomerRegistrationFetcher(url, { token: token as string }).then(
        (res) => res.json()
      ),
    { refreshInterval: 3000 }
  );
}

/**
 * Check company registration
 */
function useGetCompany(token: string, companyExists: boolean) {
  return useSWR(
    companyExists && token ? ENDPOINTS.get_company : null,
    (url) =>
      getCompanyFetcher(url, { token: token as string }).then((res) =>
        res.json()
      ),
    { refreshInterval: 3000 }
  );
}

/**
 * Check company registration
 */
function useGetCustomer(token: string, customerExists: boolean) {
  return useSWR(
    customerExists && token ? ENDPOINTS.get_customer : null,
    (url) =>
      getCustomerFetcher(url, { token: token as string }).then((res) =>
        res.json()
      ),
    { refreshInterval: 3000 }
  );
}

/**
 * User details
 */
function useUserDetails(token: string) {
  return useSWR(
    ENDPOINTS.user_details,
    (url) =>
      userDetailsFetcher(url, { token: token as string }).then((res) =>
        res.json()
      ),
    { refreshInterval: 3000 }
  );
}

/**
 * Brand online
 */
function useBrandOnline(token: string, brandName: string) {
  return useSWR(
    brandName !== undefined ? `${ENDPOINTS.brand_online}/${brandName}` : null,
    (url: string) =>
      getBrandOnlineFetcher(`${ENDPOINTS.brand_online}/${brandName}`, {
        token: token as string,
      }).then((res) => res.json())
  );
}

/**
 * Signed urls' files
 */
function useFileSignedUrl(token: string, filePath: string) {
  return useSWR(
    token !== undefined &&
      token !== null &&
      filePath !== undefined &&
      filePath !== null
      ? `${ENDPOINTS.file_signed_url}`
      : null,
    (url: string) =>
      getFileSignedUrlFetcher(`${ENDPOINTS.file_signed_url}`, filePath, {
        token: token as string,
      }).then((res) => res.json()),
    {
      revalidateOnFocus: false,
    }
  );
}

export {
  useBrandFilesList,
  useBrandsList,
  useCheckCompanyRegistration,
  useCheckCustomerRegistration,
  useGetCompany,
  useGetCustomer,
  useUserDetails,
  useBrandOnline,
  useFileSignedUrl,
};
