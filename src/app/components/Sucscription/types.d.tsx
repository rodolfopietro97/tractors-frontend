/**
 * Type used to represnet a subscription
 */
type SubscriptionType = {
  id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
};

export { type SubscriptionType };
