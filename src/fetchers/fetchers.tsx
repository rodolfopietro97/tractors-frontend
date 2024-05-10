/**
 * Fetcher used to get brands list
 */
const brandsListFether = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

/**
 * Fetcher used to get brands files
 */
const brandFilesFether = (
  url: string,
  authenticationToken: {
    token: string;
  }
): Promise<Response> =>
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken.token,
    },
  });

/**
 * Fetcher used to check if customer is registered
 */
const checkCustomerRegistrationFetcher = (
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
 * Fetcher for user details
 */
const userDetailsFetcher = (
  url: string,
  authenticationToken: { token: string }
): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken.token,
    },
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
 * Fetcher used to check if company is registered
 */
const checkCompanyRegistrationFetcher = (
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

/**
 * Get customer data
 */
const getCustomerFetcher = (
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

/**
 * Get company data
 */
const getCompanyFetcher = (
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

/**
 * Brands online fetchers
 */
const getBrandOnlineFetcher = (
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

/**
 * Fetcher used for signed urls' files
 */
const getFileSignedUrlFetcher = (
  url: string,
  filePath: string,
  authenticationToken: {
    token: string;
  }
): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + authenticationToken.token,
    },
    body: JSON.stringify({
      file_path: filePath,
    }),
  });

/**
 * Get all products available
 */
const productsListFetcher = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
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

/**
 * Create a checkout session
 */
const subscriptionFetcher = (
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
  brandsListFether,
  brandFilesFether,
  checkCustomerRegistrationFetcher,
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
  userDetailsFetcher,
  createUpdateCompanyFetcher,
  checkCompanyRegistrationFetcher,
  getCustomerFetcher,
  getCompanyFetcher,
  getBrandOnlineFetcher,
  getFileSignedUrlFetcher,
  productsListFetcher,
  createCheckoutSessionFetcher,
  subscriptionFetcher,
};
