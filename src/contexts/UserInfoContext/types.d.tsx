/**
 * UserInfo context type
 */
type UserInfoContextContextType = {
  /**
   * Customer and company exists
   */
  customerExists: boolean;
  companyExists: boolean;

  /**
   * Customer data
   */
  customer: {
    name: string;
    surname: string;
    fiscal_code: string;
    phone_number: string;
    nation: string;
    region: string;
    council: string;
    city: string;
    address: string;
  } | null;

  /**
   * Company data
   */
  company: {
    name: string;
    type: string;
    vat_number: string;
    pec: string;
    unique_company_code: string;
  } | null;

  /**
   * Error loading request
   */
  error: string | null;
  isLoading: boolean;
};

export { type UserInfoContextContextType };
