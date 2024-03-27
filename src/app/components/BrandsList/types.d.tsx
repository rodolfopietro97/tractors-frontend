/**
 * Brand type
 */
type BrandType = {
  name: string;
  image: string;
  category: string;
  type: string;
  brand_online_url: string;
};

/**
 * Brand files type
 */
type BrandFilesType = {
  file: string;
  description: string;
  brand: string;
};

export { type BrandType, type BrandFilesType };
