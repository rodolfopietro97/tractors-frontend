/**
 * Main backend endpoint
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Return main endpoints
 */
const ENDPOINTS = {
  // ********** Users Endpoints **********
  user_register: `${API_URL}/users/register/`,
  user_login: `${API_URL}/users/login/`,
  user_logout: `${API_URL}/users/logout/`,
  email_confirm: `${API_URL}/users/account-confirm-email/`,
  password_reset: `${API_URL}/users/password/reset/`,
  password_reset_confirm: `${API_URL}/users/password/reset/confirm/`,

  // ********** Token Endpoints **********
  token_verify: `${API_URL}/users/token/verify/`,
  token_refresh: `${API_URL}/users/token/refresh/`,

  // ********** Customers Endpoints **********
  create_customer: `${API_URL}/customers/create-customer/`,
  update_customer: `${API_URL}/customers/update-customer/`,

  // ********** Contacts form Endpoints **********
  contacts_form: `${API_URL}/contacts/form/`,

  // ********** Companies Endpoints **********
  create_company: `${API_URL}/companies/create-company/`,
  update_company: `${API_URL}/companies/update-company/`,

  // ********** Payments Endpoints **********
  create_checkout_session: `${API_URL}/payments/create-checkout-session/`,
};

export { ENDPOINTS, API_URL };
