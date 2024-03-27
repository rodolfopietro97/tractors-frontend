'use client';
import {
  faBars,
  faRightToBracket,
  faUser,
  faUserPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ENDPOINTS, logoutFetcher } from '@/fetchers';
import { RowColHelper } from '../RowColHelper';
import { Button, LinkButton } from '../ui/Button';
import { AuthenticationContext } from '@/contexts';

/**
 * Type for Menu Entry
 */
type MenuEntry = {
  name: string;
  href: string;
  target?: string;
};

/**
 * Navbar Action Buttons.
 * For example, Login, Register, etc...
 */
function NavbarActionButtons({
  onClick,
}: {
  onClick?: () => void;
}): JSX.Element {
  // Authentication context
  const { isJWTValid, doLogout, token } = useContext(AuthenticationContext);

  // Is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Do logout
  const logout = async () => {
    setIsSubmitting(true);
    const request = await logoutFetcher(ENDPOINTS.user_logout, {
      token: token as string,
    });
    const response = await request.json();
    if (response.detail) doLogout();
    setIsSubmitting(false);
    onClick && onClick();
  };

  // Not logged in
  if (!isJWTValid)
    return (
      <RowColHelper
        className='flex flex-row justify-center'
        classNames={['mx-2 md:w-1/2 w-full', 'mx-2 md:w-1/2 w-full']}
      >
        <LinkButton onClick={onClick} href='/login' icon={faRightToBracket}>
          <span className='mx-2 text-sm'>Login</span>
        </LinkButton>
        <LinkButton onClick={onClick} href='/register' icon={faUserPlus}>
          <span className='mx-2 text-sm'>Register</span>
        </LinkButton>
      </RowColHelper>
    );
  // Logged in
  else
    return (
      <RowColHelper
        className='flex flex-row justify-center'
        classNames={['mx-2 md:w-1/2 w-full', 'mx-2 md:w-1/2 w-full']}
      >
        <Button isLoading={isSubmitting} onClick={logout} icon={faUserPlus}>
          <span className='mx-2 text-sm'>Logout</span>
        </Button>

        <LinkButton onClick={onClick} href='/profile' icon={faUser}>
          <span className='mx-2 text-sm'>Profile</span>
        </LinkButton>
      </RowColHelper>
    );
}

/**
 * Simple menu entry
 */
function NavbarMenuEntry({
  onClick,
  href,
  name,
  target,
  isMobile,
}: MenuEntry & { onClick?: () => void; isMobile: boolean }): JSX.Element {
  return (
    <Link
      className={clsx({
        'mx-3 text-sm uppercase hover:underline': true,
        'my-5': isMobile,
      })}
      href={href}
      target={target}
      onClick={onClick}
    >
      {name}
    </Link>
  );
}

/**
 * Hamburguer icon for mobile menu
 */
function NavbarHamburguerIcon({
  mobileMenuOpen,
  onClick,
}: {
  mobileMenuOpen: boolean;
} & React.ComponentPropsWithRef<'button'>): JSX.Element {
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon
        icon={mobileMenuOpen ? faX : faBars}
        className={clsx({
          'h-4': true,
          'text-red-500': mobileMenuOpen,
        })}
      />
    </Button>
  );
}

/**
 * Main Navbar component
 */
function Navbar({
  menuEntriesNotLoggedIn,
  menuEntriesLoggedIn,
}: {
  menuEntriesNotLoggedIn: Array<MenuEntry>;
  menuEntriesLoggedIn: Array<MenuEntry>;
}): JSX.Element {
  // Mobile menu state. If true, the mobile menu is open, otherwise is closed.
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Authentication context
  const { isJWTValid } = useContext(AuthenticationContext);

  return (
    // Big Navbar. It is a global div that center our navbar container
    <nav className='flex flex-col items-center justify-center text-center'>
      {/* Navbar container. It is a flex container that contains all the navbar elements. Col on mobile, row on desktop. */}
      <div className='container flex flex-col justify-between md:flex-row'>
        {/* Brand and Hamburgher icon (if mobile) */}
        <div className='flex w-full flex-row md:block md:w-1/5'>
          <div className='w-2/3 py-3 md:w-full'>
            <Link href='/' className='text-2xl font-bold'>
              Tractors
            </Link>
          </div>

          <div className='flex w-1/3 flex-row items-center justify-center md:hidden'>
            <NavbarHamburguerIcon
              mobileMenuOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {/* Menu entries - NON MOBILE */}
        <div className='hidden w-2/5 flex-row items-center justify-center md:flex'>
          {!isJWTValid &&
            menuEntriesNotLoggedIn.map((entry, index) => (
              <NavbarMenuEntry
                key={index}
                isMobile={false}
                href={entry.href}
                name={entry.name}
                target={entry.target}
              />
            ))}
          {isJWTValid &&
            menuEntriesLoggedIn.map((entry, index) => (
              <NavbarMenuEntry
                key={index}
                isMobile={false}
                href={entry.href}
                name={entry.name}
                target={entry.target}
              />
            ))}
        </div>

        {/* Menu entries - MOBILE AND if mobile menu is open */}
        {mobileMenuOpen && (
          <div className='flex flex-col py-8 md:hidden'>
            {/* Entries */}
            {!isJWTValid &&
              menuEntriesNotLoggedIn.map((entry, index) => (
                <NavbarMenuEntry
                  onClick={() => setMobileMenuOpen(false)}
                  key={index}
                  isMobile={false}
                  href={entry.href}
                  name={entry.name}
                  target={entry.target}
                />
              ))}
            {isJWTValid &&
              menuEntriesLoggedIn.map((entry, index) => (
                <NavbarMenuEntry
                  onClick={() => setMobileMenuOpen(false)}
                  key={index}
                  isMobile={false}
                  href={entry.href}
                  name={entry.name}
                  target={entry.target}
                />
              ))}

            {/* Actions (Login, Registration, ...) */}
            <div className='mt-7 flex flex-row justify-center'>
              <NavbarActionButtons onClick={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Actions (Login, Registration, ...) */}
        <div className='hidden w-2/5 flex-row items-center justify-center md:flex'>
          <NavbarActionButtons />
        </div>
      </div>
    </nav>
  );
}

export { Navbar, type MenuEntry };
