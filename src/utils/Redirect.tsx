import { NextRouter } from 'next/router';

/**
 * Type for redirect map
 */
type RedirectMapType = {
  loggedIn: Array<string>;
  notLoggedIn: Array<string>;
  noRestrictions: Array<string>;
};

/**
 * Map of redirecting urls
 */
const redirectMap: RedirectMapType = {
  loggedIn: ['/register-company', '/profile', '/dashboard'],
  notLoggedIn: [
    '/register',
    // '/pricing',
    'password-reset-confirm/[...userParameters]',
    '/login',
    '/',
    '/forgot-password',
    '/email-confirm/[key]',
    '/contacts',
    // '/brands-catalog',
  ],
  noRestrictions: ['/terms', '/privacy'],
};

/**
 * Make redirects easier depending by if we are logged in or not
 */
function conditionalRedirect(isLoggedIn: boolean, router: NextRouter): void {
  const currentPath = router.pathname;

  if (isLoggedIn && redirectMap.notLoggedIn.includes(currentPath))
    router.push('/brands');

  if (!isLoggedIn && redirectMap.loggedIn.includes(currentPath))
    router.push('/login');
}

export { conditionalRedirect };
