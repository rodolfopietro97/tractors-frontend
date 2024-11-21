import {
  FetcherBodyType,
  FetcherMethodType,
  UrlType,
} from '@/fetchers/types.d';
import { API_URL } from '@/fetchers/endpoints';

/**
 * Generic fetcher.
 * Depending on the method type, url and data, it will fetch the data.
 * Elegant way to fetch and type the data.
 *
 * @param methodType The method type (GET, POST, PUT, DELETE)
 * @param url The url to fetch
 * @param data The data to send (token and body)
 * @returns The response fetcher
 */
async function genericFetcher<
  TFetcherMethodType extends FetcherMethodType,
  TUrlType extends UrlType,
  TFetcherBodyType extends FetcherBodyType<TUrlType>,
>(
  methodType: TFetcherMethodType,
  url: TUrlType,
  data: {
    token?: string;
    body: TFetcherBodyType;
  },
  customUrlCallback?: (url: TUrlType) => string
): Promise<Response> {
  // Initialize headers depending on the authentication token
  const headers: HeadersInit =
    data.token !== undefined
      ? // Authorization header
        {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${data.token}`,
        }
      : // No Authorization header
        {
          'Content-Type': 'application/json; charset=UTF-8',
        };

  // Init url
  const requestUrl =
    customUrlCallback !== undefined
      ? `${API_URL}/${customUrlCallback(url)}`
      : `${API_URL}/${url}`;

  // Init fetcher params
  const fetcherParams =
    data.body !== null
      ? // Add body if it is not null
        {
          method: methodType,
          headers: headers,
          body: JSON.stringify(data.body),
        }
      : // No body on the request
        {
          method: methodType,
          headers: headers,
        };

  // Return fetcher depending on the request body
  return fetch(requestUrl, fetcherParams);
}

/**
 * Fetcher used to send email from contacts form
 */
const contactsFormFetcher = (
  contactsFormEmail: FetcherBodyType<'contacts/form/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'contacts/form/';

  // Set body
  const body: FetcherBodyType<'contacts/form/'> = contactsFormEmail;

  // Return fetcher
  return genericFetcher('POST', url, { body });
};

/**
 * Fetcher used to create customer
 */
const createUpdateCustomerFetcher = (
  token: string,
  customerToRegisterOrUpdate: FetcherBodyType<'customers/create-customer/'>,
  update: boolean
): Promise<Response> => {
  // Set url
  const url: UrlType = update
    ? 'customers/update-customer/'
    : 'customers/create-customer/';

  // Set body
  const body: FetcherBodyType<'customers/create-customer/'> =
    customerToRegisterOrUpdate;

  // Return fetcher
  return genericFetcher(update ? 'PUT' : 'POST', url, {
    token,
    body,
  });
};

/**
 * Fetcher for email confirmation using key
 */
const emailConfirmFetcher = (
  keyToConfirm: FetcherBodyType<'users/account-confirm-email/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/account-confirm-email/';

  // Set body
  const body: FetcherBodyType<'users/account-confirm-email/'> = keyToConfirm;

  // Return fetcher
  return genericFetcher('POST', url, {
    body,
  });
};

/**
 * Fetcher used to log-in USER
 */
const loginFetcher = (
  userToLogin: FetcherBodyType<'users/login/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/login/';

  // Set body
  const body: FetcherBodyType<'users/login/'> = userToLogin;

  // Return fetcher
  return genericFetcher('POST', url, {
    body,
  });
};

/**
 * Fetcher used to log-out user
 */
const logoutFetcher = (token: string): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/logout/';

  // Set body
  const body: FetcherBodyType<'users/logout/'> = null;

  // Return fetcher
  return genericFetcher('POST', url, {
    token,
    body,
  });
};

/**
 * Fetcher used to confirm password reset
 */
const passwordResetConfirmFetcher = (
  newPasswords: FetcherBodyType<'users/password/reset/confirm/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/password/reset/confirm/';

  // Set body
  const body: FetcherBodyType<'users/password/reset/confirm/'> = newPasswords;

  // Return fetcher
  return genericFetcher('POST', url, {
    body,
  });
};

/**
 * Fetcher for password reset
 */
const passwordResetFetcher = (
  emailToRecovery: FetcherBodyType<'users/password/reset/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/password/reset/';

  // Set body
  const body: FetcherBodyType<'users/password/reset/'> = emailToRecovery;

  // Return fetcher
  return genericFetcher('POST', url, {
    body,
  });
};

/**
 * Fetcher used to sign up USERS
 */
const signUpFetcher = (
  userToRegister: FetcherBodyType<'users/register/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/register/';

  // Set body
  const body: FetcherBodyType<'users/register/'> = userToRegister;

  // Return fetcher
  return genericFetcher('POST', url, {
    body,
  });
};

/**
 * Fetcher used to verify token
 */
const tokenVerifyFetcher = (
  tokenToVerify: FetcherBodyType<'users/token/verify/'>
): Promise<Response> => {
  // Set url
  const url: UrlType = 'users/token/verify/';

  // Set body
  const body: FetcherBodyType<'users/token/verify/'> = tokenToVerify;

  // Return fetcher
  return genericFetcher('POST', url, {
    body,
  });
};

/**
 * Fetcher used to create and update the company
 */
const createUpdateCompanyFetcher = (
  token: string,
  companyToRegisterOrUpdate: FetcherBodyType<'companies/create-company/'>,
  update: boolean
): Promise<Response> => {
  // Set url
  const url: UrlType = update
    ? 'companies/update-company/'
    : 'companies/create-company/';

  // Set body
  const body: FetcherBodyType<'companies/create-company/'> =
    companyToRegisterOrUpdate;

  // Return fetcher
  return genericFetcher(update ? 'PUT' : 'POST', url, {
    token,
    body,
  });
};

/**
 * Create a checkout session
 */
const getCheckoutSessionFetcher = (
  priceId: string,
  token: string
): Promise<Response> => {
  // Set url
  const url: UrlType = 'payments/create-checkout-session/';

  // Set body
  const body: FetcherBodyType<'payments/create-checkout-session/'> = null;

  // Return fetcher
  return genericFetcher(
    'GET',
    url as 'payments/create-checkout-session/',
    { token: token, body },
    (url) => `${url}${priceId}`
  );
};

/**
 * Delete a subscription
 */
const deleteSubscriptionFetcher = (token: string): Promise<Response> => {
  // Set url
  const url: UrlType = 'payments/delete-subscription/';

  // Set body
  const body: FetcherBodyType<'payments/delete-subscription/'> = null;

  // Return fetcher
  return genericFetcher('DELETE', url as 'payments/delete-subscription/', {
    token: token,
    body,
  });
};

export {
  contactsFormFetcher,
  createUpdateCustomerFetcher,
  emailConfirmFetcher,
  loginFetcher,
  logoutFetcher,
  passwordResetConfirmFetcher,
  passwordResetFetcher,
  signUpFetcher,
  tokenVerifyFetcher,
  createUpdateCompanyFetcher,
  getCheckoutSessionFetcher,
  genericFetcher,
  deleteSubscriptionFetcher,
};
