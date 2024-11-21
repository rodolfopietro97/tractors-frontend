import { SubscriptionType } from '@/app/components/Sucscription';

/**
 * UserInfo context type
 */
type UserInfoContextContextType = {
  /**
   * Customer and company exists
   */
  customerExists: boolean;
  companyExists: boolean;
  hasSubscription: boolean;

  /**
   * Customer data
   */
  customer: {
    name: string;
    surname: string;
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
   * Subscription data
   */
  subscription: SubscriptionType | null;

  /**
   * Error loading request
   */
  error: string | null;
  isLoading: boolean;
};

export { type UserInfoContextContextType };
