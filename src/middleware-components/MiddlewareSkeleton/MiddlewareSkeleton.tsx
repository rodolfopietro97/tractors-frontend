import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts';

/**
 * Skeleton to simplify for middleware components
 * @param children
 * @constructor
 */
function MiddlewareSkeleton({
  loggedInChildren,
  notLoggedInChildren,
}: {
  loggedInChildren: JSX.Element;
  notLoggedInChildren: JSX.Element;
}) {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

  if (token !== null) return loggedInChildren;
  return notLoggedInChildren;
}

export { MiddlewareSkeleton };
