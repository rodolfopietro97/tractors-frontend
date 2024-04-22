/**
 * Content for Credential for a brand online.
 * We can have the credentials OR the jwt.
 */
type BrandOnlineCredentialsContentData =
  | {
      jwt: string;
      username: never;
      password: never;
    }
  | {
      jwt: never;
      username: string;
      password: string;
    };

export { type BrandOnlineCredentialsContentData };
