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
  console.log('genericFetcher', methodType, url, data, customUrlCallback);
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

  if (url === 'brands/brand-online/') console.log('requestUrl', requestUrl);

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
  url: string,
  contactsFormEmail: {
    name: string;
    surname: string;
    email: string;
    subject: string;
    message: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(contactsFormEmail),
  });

/**
 * Fetcher used to create customer
 */
const createUpdateCustomerFetcher = (
  url: string,
  authenticationToken: string,
  customerToRegisterOrUpdate: {
    name: string;
    surname: string;
  },
  update: boolean
): Promise<Response> =>
  fetch(url, {
    method: update ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken,
    },
    body: JSON.stringify(customerToRegisterOrUpdate),
  });

/**
 * Fetcher for email confirmation using key
 */
const emailConfirmFetcher = (
  url: string,
  keyToConfirm: { key: string }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(keyToConfirm),
  });

/**
 * Fetcher used to login USER
 */
const loginFetcher = (
  url: string,
  userToLogin: {
    username: string;
    email: string;
    password: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(userToLogin),
  });

/**
 * Fetcher used to logout user
 */
const logoutFetcher = (
  url: string,
  authenticationToken: { token: string }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken.token,
    },
  });

/**
 * Fetcher used to confirm password reset
 */
const passwordResetConfirmFetcher = (
  url: string,
  newPasswordsAndUserData: {
    new_password1: string;
    new_password2: string;
    uid: string;
    token: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newPasswordsAndUserData),
  });

/**
 * Fetcher for password reset
 */
const passwordResetFetcher = (
  url: string,
  emailToRecovery: {
    email: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(emailToRecovery),
  });

/**
 * Fetcher used to sign up USERS
 */
const signUpFetcher = (
  url: string,
  userToRegister: {
    username: string;
    email: string;
    password1: string;
    password2: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(userToRegister),
  });

/**
 * Fetcher used to refresh token
 */
const tokenRefreshFetcher = (
  url: string,
  tokenToRefresh: { refresh: string }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(tokenToRefresh),
  });

/**
 * Fetcher used to verify token
 */
const tokenVerifyFetcher = (
  url: string,
  tokenToVerify: { token: string }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(tokenToVerify),
  });

/**
 * Fetcher used to create and update company
 */
const createUpdateCompanyFetcher = (
  url: string,
  authenticationToken: string,
  companyToRegisterOrUpdate: {
    name: string;
    type: string;
    vat_number: string;
    pec: string;
    unique_company_code: string;
  },
  update: boolean
): Promise<Response> =>
  fetch(url, {
    method: update ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken,
    },
    body: JSON.stringify(companyToRegisterOrUpdate),
  });

/**
 * Create a checkout session
 */
const createCheckoutSessionFetcher = (
  url: string,
  authenticationToken: {
    token: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken.token,
    },
  });

export {
  contactsFormFetcher,
  createUpdateCustomerFetcher,
  emailConfirmFetcher,
  loginFetcher,
  logoutFetcher,
  passwordResetConfirmFetcher,
  passwordResetFetcher,
  signUpFetcher,
  tokenRefreshFetcher,
  tokenVerifyFetcher,
  createUpdateCompanyFetcher,
  createCheckoutSessionFetcher,
  genericFetcher,
};
