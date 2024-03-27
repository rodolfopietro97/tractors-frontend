/**
 * Main backend endpoint
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Return main endpoints
 */
const ENDPOINTS = {
  // Users
  user_register: `${API_URL}/users/register/`,
  user_login: `${API_URL}/users/login/`,
  user_logout: `${API_URL}/users/logout/`,
  user_details: `${API_URL}/users/details/`,
  email_confirm: `${API_URL}/users/account-confirm-email/`,
  password_reset: `${API_URL}/users/password/reset/`,
  password_reset_confirm: `${API_URL}/users/password/reset/confirm/`,

  // Tokens
  token_verify: `${API_URL}/users/token/verify/`,
  token_refresh: `${API_URL}/users/token/refresh/`,

  // Customers
  create_customer: `${API_URL}/customers/create-customer/`,
  check_customer_registration: `${API_URL}/customers/check-customer-registration/`,
  get_customer: `${API_URL}/customers/get-customer/`,
  update_customer: `${API_URL}/customers/update-customer/`,

  // Contacts form
  contacts_form: `${API_URL}/contacts/form/`,

  // Companies
  create_company: `${API_URL}/companies/create-company/`,
  check_company_registration: `${API_URL}/companies/check-company-registration/`,
  get_company: `${API_URL}/companies/get-company/`,
  update_company: `${API_URL}/companies/update-company/`,

  // Brands
  brands_list: `${API_URL}/brands/list/`,
  brands_files: `${API_URL}/brands/files/`,
  brand_online: `${API_URL}/brands/brand-online`,
  file_signed_url: `${API_URL}/brands/file-signed-url/`,
};

export { ENDPOINTS, API_URL };
