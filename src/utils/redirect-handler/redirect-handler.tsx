import { NextRouter } from 'next/router';

/**
 * Handle redirect based on token and current path
 *
 * @param token - JWT token
 * @param router - Router instance
 */
function handleRedirect(token: string | null, router: NextRouter): void {
  const currentPath = router.pathname;

  console.log('Current path:', currentPath);
  // Logged in
  if (token !== null) {
    // router.push('/');
  }
  // Not logged in
  else {
    // router.push('/login');
  }
}

export { handleRedirect };
