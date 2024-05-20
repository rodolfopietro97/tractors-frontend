/**
 * Fetcher Method type
 */
type FetcherMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Type for URL.
 * Basically it is the list of all URLs available.
 */
type UrlType =
  | null
  // ********** Users Endpoints **********
  | 'users/register/'
  | 'users/login/'
  | 'users/logout/'
  | 'users/details/'
  | 'users/account-confirm-email/'
  | 'users/password/reset/'
  | 'users/password/reset/confirm/'
  // ********** Token Endpoints **********
  | 'users/token/verify/'
  | 'users/token/refresh/'
  // ********** Customers Endpoints **********
  | 'customers/create-customer/'
  | 'customers/check-customer-registration/'
  | 'customers/get-customer/'
  | 'customers/update-customer/'
  // ********** Contacts form Endpoints **********
  | 'contacts/form/'
  // ********** Companies Endpoints **********
  | 'companies/create-company/'
  | 'companies/check-company-registration/'
  | 'companies/get-company/'
  | 'companies/update-company/'
  // ********** Brands Endpoints **********
  | 'brands/list/'
  | 'brands/files/'
  | 'brands/brand-online/'
  | 'brands/file-signed-url/'
  // ********** Payments Endpoints **********
  | 'payments/products/'
  | 'payments/create-checkout-session/'
  | 'payments/get-subscription/';

/**
 * Fetcher body type.
 * It depends on the url.
 */
type FetcherBodyType<TUrlType extends UrlType> =
  // ********** Users Endpoints **********
  TUrlType extends 'users/register/'
    ? {
        username: string;
        email: string;
        password1: string;
        password2: string;
      }
    : TUrlType extends 'users/login/'
      ? {
          username: string;
          email: string;
          password: string;
        }
      : TUrlType extends 'users/logout/'
        ? null
        : TUrlType extends 'users/details/'
          ? null
          : TUrlType extends 'users/account-confirm-email/'
            ? {
                key: string;
              }
            : TUrlType extends 'users/password/reset/'
              ? {
                  email: string;
                }
              : TUrlType extends 'users/password/reset/confirm/'
                ? {
                    new_password1: string;
                    new_password2: string;
                    uid: string;
                    token: string;
                  }
                : // ********** Token Endpoints **********
                  TUrlType extends 'users/token/verify/'
                  ? { token: string }
                  : TUrlType extends 'users/token/refresh/'
                    ? { refresh: string }
                    : // ********** Customers Endpoints **********
                      TUrlType extends 'customers/create-customer/'
                      ? {
                          name: string;
                          surname: string;
                        }
                      : TUrlType extends 'customers/check-customer-registration/'
                        ? null
                        : TUrlType extends 'customers/get-customer/'
                          ? null
                          : TUrlType extends 'customers/update-customer/'
                            ? FetcherBodyType<'customers/create-customer/'>
                            : // ********** Contacts form Endpoints **********
                              TUrlType extends 'contacts/form/'
                              ? {
                                  name: string;
                                  surname: string;
                                  email: string;
                                  subject: string;
                                  message: string;
                                }
                              : // ********** Companies Endpoints **********
                                TUrlType extends 'companies/create-company/'
                                ? {
                                    name: string;
                                    type: string;
                                    vat_number: string;
                                    pec: string;
                                    unique_company_code: string;
                                  }
                                : TUrlType extends 'companies/check-company-registration/'
                                  ? null
                                  : TUrlType extends 'companies/get-company/'
                                    ? null
                                    : TUrlType extends 'companies/update-company/'
                                      ? FetcherBodyType<'companies/create-company/'>
                                      : // ********** Brands Endpoints **********
                                        TUrlType extends 'brands/list/'
                                        ? null
                                        : TUrlType extends 'brands/files/'
                                          ? null
                                          : TUrlType extends 'brands/brand-online/'
                                            ? null
                                            : TUrlType extends 'brands/file-signed-url/'
                                              ? { file_path: string }
                                              : // ********** Payments Endpoints **********
                                                TUrlType extends 'payments/products/'
                                                ? null
                                                : TUrlType extends 'payments/create-checkout-session/'
                                                  ? null
                                                  : TUrlType extends 'payments/get-subscription/'
                                                    ? null
                                                    : never;

/**
 * Response
 * It depends on the url.
 */
type APIResponse<TUrlType extends UrlType> =
  // ********** Users Endpoints **********
  TUrlType extends 'users/register/'
    ? {}
    : TUrlType extends 'users/login/'
      ? {}
      : TUrlType extends 'users/logout/'
        ? {}
        : TUrlType extends 'users/details/'
          ? null
          : TUrlType extends 'users/account-confirm-email/'
            ? {}
            : TUrlType extends 'users/password/reset/'
              ? {}
              : TUrlType extends 'users/password/reset/confirm/'
                ? {}
                : // ********** Token Endpoints **********
                  TUrlType extends 'users/token/verify/'
                  ? {}
                  : TUrlType extends 'users/token/refresh/'
                    ? {}
                    : // ********** Customers Endpoints **********
                      TUrlType extends 'customers/create-customer/'
                      ? {}
                      : TUrlType extends 'customers/check-customer-registration/'
                        ? null
                        : TUrlType extends 'customers/get-customer/'
                          ? null
                          : TUrlType extends 'customers/update-customer/'
                            ? {}
                            : // ********** Contacts form Endpoints **********
                              TUrlType extends 'contacts/form/'
                              ? {}
                              : // ********** Companies Endpoints **********
                                TUrlType extends 'companies/create-company/'
                                ? {}
                                : TUrlType extends 'companies/check-company-registration/'
                                  ? null
                                  : TUrlType extends 'companies/get-company/'
                                    ? null
                                    : TUrlType extends 'companies/update-company/'
                                      ? {}
                                      : // ********** Brands Endpoints **********
                                        TUrlType extends 'brands/list/'
                                        ? null
                                        : TUrlType extends 'brands/files/'
                                          ? null
                                          : TUrlType extends 'brands/brand-online/'
                                            ? null
                                            : TUrlType extends 'brands/file-signed-url/'
                                              ? { file_path: string }
                                              : // ********** Payments Endpoints **********
                                                TUrlType extends 'payments/products/'
                                                ? null
                                                : TUrlType extends 'payments/create-checkout-session/'
                                                  ? {}
                                                  : TUrlType extends 'payments/get-subscription/'
                                                    ? null
                                                    : never;

export {
  type FetcherMethodType,
  type UrlType,
  type FetcherBodyType,
  type APIResponse,
};
