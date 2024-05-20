import { genericFetcher, UrlType, FetcherBodyType } from '@/fetchers';
import useSWR from 'swr';

/**
 * Get all PDF files of a brand
 */
function useBrandFilesList(token: string | null, brandName: string | null) {
  // Set url
  const url: UrlType =
    brandName !== null && token !== null ? 'brands/files/' : null;

  // Set body
  const body: FetcherBodyType<'brands/files/'> = null;

  // Return SWR
  return useSWR(url as 'brands/files/', (url) =>
    genericFetcher(
      'GET',
      url as 'brands/files/',
      { token: token as string, body },
      (url) => `${url}${brandName}`
    ).then((res) => res.json())
  );
}

/**
 * Fetch the list of Brands
 */
function useBrandsList() {
  // Set url
  const url = 'brands/list/';

  // Set body
  const body: FetcherBodyType<'brands/list/'> = null;

  // Return SWR
  return useSWR(
    url as 'brands/list/',
    (url) =>
      genericFetcher('GET', url as UrlType, { body }).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Check company registration
 */
function useCheckCompanyRegistration(token: string | null) {
  // Set url
  const url: UrlType =
    token !== null ? 'companies/check-company-registration/' : null;

  // Set body
  const body: FetcherBodyType<'companies/check-company-registration/'> = null;

  // Return SWR
  return useSWR(
    url as 'companies/check-company-registration/',
    (url) =>
      genericFetcher('GET', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Check customer registration
 */
function useCheckCustomerRegistration(token: string | null) {
  // Set url
  const url: UrlType =
    token !== null ? 'customers/check-customer-registration/' : null;

  // Set body
  const body: FetcherBodyType<'customers/check-customer-registration/'> = null;

  // Return SWR
  return useSWR(
    url as 'customers/check-customer-registration/',
    (url) =>
      genericFetcher('GET', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Get company data (if the company exists)
 */
function useGetCompany(token: string | null, companyExists: boolean) {
  // Set url
  const url: UrlType =
    token !== null && companyExists ? 'companies/get-company/' : null;

  // Set body
  const body: FetcherBodyType<'companies/get-company/'> = null;

  // Return SWR
  return useSWR(
    url as 'companies/get-company/',
    (url) =>
      genericFetcher('GET', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Check customer data (if the customer exists)
 */
function useGetCustomer(token: string | null, customerExists: boolean) {
  // Set url
  const url: UrlType =
    token !== null && customerExists ? 'customers/get-customer/' : null;

  // Set body
  const body: FetcherBodyType<'customers/get-customer/'> = null;

  // Return SWR
  return useSWR(
    url as 'customers/get-customer/',
    (url) =>
      genericFetcher('GET', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Get user details
 */
function useUserDetails(token: string | null) {
  // Set url
  const url: UrlType = token !== null ? 'users/details/' : null;

  // Set body
  const body: FetcherBodyType<'users/details/'> = null;

  // Return SWR
  return useSWR(
    url as 'users/details/',
    (url) =>
      genericFetcher('GET', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    { refreshInterval: 3000 }
  );
}

/**
 * Get brand online
 */
function useBrandOnline(token: string | null, brandName: string | null) {
  // Set url
  const url: UrlType =
    token !== null && brandName !== null ? 'brands/brand-online/' : null;

  // Set body
  const body: FetcherBodyType<'brands/brand-online/'> = null;

  // Return SWR
  return useSWR(url as 'brands/brand-online/', (url) =>
    genericFetcher(
      'GET',
      url,
      { token: token as string, body },
      (url) => `${url}${brandName}`
    ).then((res) => res.json())
  );
}

/**
 * Get signed urls' of files
 */
function useFileSignedUrl(token: string | null, filePath: string | null) {
  // Set url
  const url: UrlType =
    token !== null && filePath !== null ? 'brands/file-signed-url/' : null;

  // Set body
  const body: FetcherBodyType<'brands/file-signed-url/'> = {
    file_path: filePath as string,
  };

  // Return SWR
  return useSWR(
    url as 'brands/file-signed-url/',
    (url) =>
      genericFetcher('POST', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    {
      revalidateOnFocus: false,
    }
  );
}

/**
 * Fetch the list of available products
 */
function useProductsList() {
  // Set url
  const url: UrlType = 'payments/products/';

  // Set body
  const body: FetcherBodyType<'payments/products/'> = null;

  // Return SWR
  return useSWR(url as 'payments/products/', (url) =>
    genericFetcher('GET', url, { body }).then((res) => res.json())
  );
}

/**
 * Get user subscription
 */
function useSubscription(token: string | null) {
  // Set url
  const url: UrlType = token !== null ? 'payments/get-subscription/' : null;

  // Set body
  const body: FetcherBodyType<'payments/get-subscription/'> = null;

  // Return SWR
  return useSWR(
    url as 'payments/get-subscription/',
    (url) =>
      genericFetcher('GET', url as UrlType, {
        token: token as string,
        body,
      }).then((res) => res.json()),
    { refreshInterval: 3000 }
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
  useProductsList,
  useSubscription,
};
