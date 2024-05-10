/**
 * Type for price future of a plan
 */
type ProductFuturePlanType = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: PricePlanType;
};

/**
 * Type for single price plan
 */
type PricePlanType = {
  id: string;
  price: string;
};

export { type ProductFuturePlanType, type PricePlanType };
