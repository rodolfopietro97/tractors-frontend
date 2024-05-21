import { BrandOnlineCredentialsContentData } from '@/app/components/BrandOnlineContent';

// @TODO: Probably types here
type FetcherReturnType<TFetcherName extends 'useBrandOnline'> =
  TFetcherName extends 'useBrandOnline'
    ? (
        url: string,
        credentials: BrandOnlineCredentialsContentData,
        code: string
      ) => Promise<Response>
    : never;

export { type FetcherReturnType };
