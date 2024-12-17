'use client';
import { Button } from '@/app/catalyst-components/button';
import { logoutFetcher } from '@/fetchers';
import { useAuthentication } from '@/hooks';
import {
  faBars,
  faDoorOpen,
  faExclamationTriangle,
  faRightToBracket,
  faUser,
  faUserPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RowColHelper } from '../RowColHelper';
import { Spinner } from '../Spinner';

import { useUserInfo } from '@/hooks/userInfo';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import clsx from 'clsx';

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
  // Router instance
  const router = useRouter();

  // Authentication context
  const { doLogout, token } = useAuthentication();

  // Is submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Do logout
  const logout = async () => {
    setIsSubmitting(true);
    const request = await logoutFetcher(token as string);
    const response = await request.json();
    if (response.detail) doLogout();
    setIsSubmitting(false);
    onClick && onClick();
  };

  // Not logged in
  if (token === null)
    return (
      <RowColHelper
        className='flex flex-row justify-center'
        classNames={['mx-2 md:w-1/2 w-full', 'mx-2 md:w-1/2 w-full']}
      >
        <Button color={'light'} onClick={() => router.push('/login')}>
          <FontAwesomeIcon icon={faRightToBracket} />
          <span className='hidden sm:inline'>Login</span>
        </Button>
        <Button color='lime' onClick={() => router.push('/register')}>
          <FontAwesomeIcon icon={faUserPlus} />
          <span className='hidden sm:inline'>Registrati</span>
        </Button>
      </RowColHelper>
    );
  // Logged in
  else
    return (
      <RowColHelper
        className='flex flex-row justify-center'
        classNames={['mx-2 md:w-1/2 w-full', 'mx-2 md:w-1/2 w-full']}
      >
        <Button color={'light'} onClick={() => router.push('/profile')}>
          <FontAwesomeIcon icon={faUser} />
          <span className='hidden sm:inline'>Profile</span>
        </Button>
        <Button color='red' disabled={isSubmitting} onClick={logout}>
          {isSubmitting ? (
            <Spinner size='xxs' />
          ) : (
            <>
              <FontAwesomeIcon icon={faDoorOpen} />
              <span className='hidden sm:inline'>Logout</span>
            </>
          )}
        </Button>
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
  // Router instance
  const router = useRouter();

  // Non mobile menu entry
  if (!isMobile)
    return (
      <Link
        href={href}
        className={clsx({
          'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700':
            router.pathname !== href,
          'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900':
            router.pathname === href,
        })}
        onClick={onClick}
        target={target}
      >
        {name}
      </Link>
    );
  // Mobile menu enty
  else
    return (
      <DisclosureButton
        className={clsx({
          'block w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6':
            router.pathname !== href,
          'block w-full border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6':
            router.pathname === href,
        })}
        onClick={onClick}
      >
        <Link href={href} target={target}>
          {name}
        </Link>
      </DisclosureButton>
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
    <Button onClick={onClick} color='light'>
      <FontAwesomeIcon icon={mobileMenuOpen ? faX : faBars} className='h-4' />
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
  // Chek if the user has or not a subscription
  const { hasSubscription, customerExists } = useUserInfo();

  // Mobile menu state. If true, the mobile menu is open, otherwise is closed.
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Authentication context
  const { token } = useAuthentication();

  return (
    <div className='flex flex-col p-0'>
      {/* If the user has not subacription, show a warning message */}
      {token !== null && customerExists && !hasSubscription && (
        <div className='flex w-full items-center justify-center'>
          <div className='flex w-screen items-center justify-center bg-yellow-50 py-3'>
            <div className='shrink-0'>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className='h-5 text-yellow-700'
              />
            </div>
            <div className='ml-3'>
              <p className='text-sm text-yellow-700'>
                Stai usando la versione gratuita di prova. Per visualizzare
                tutti i contenuti{' '}
                <Link className='font-bold underline' href={'/pricing'}>
                  sottoscrivi un abbonamento
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      <Disclosure as='nav' className='shadow'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex'>
              <div className='-ml-2 mr-2 flex items-center md:hidden'>
                {/* Mobile menu button */}
                <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {/* Hamburgher button */}
                  <NavbarHamburguerIcon
                    mobileMenuOpen={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  />
                </DisclosureButton>
              </div>
              <div className='flex shrink-0 items-center'>
                {/* Navbar Brand */}
                <Link
                  href='/'
                  className='text-xl font-bold uppercase text-gray-900'
                >
                  FTractors
                </Link>
              </div>
              {/* Menu entries - NON MOBILE */}
              <div className='hidden md:ml-6 md:flex md:space-x-8'>
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                {token === null &&
                  menuEntriesNotLoggedIn.map((entry, index) => (
                    <NavbarMenuEntry
                      key={index}
                      isMobile={false}
                      href={entry.href}
                      name={entry.name}
                      target={entry.target}
                    />
                  ))}
                {token !== null &&
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
            </div>
            <div className='flex items-center'>
              <div className='shrink-0'>
                <NavbarActionButtons />
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className='md:hidden'>
          <div className='space-y-1 pb-3 pt-2'>
            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
            {token === null &&
              menuEntriesNotLoggedIn.map((entry, index) => (
                <NavbarMenuEntry
                  key={index}
                  isMobile={true}
                  href={entry.href}
                  name={entry.name}
                  target={entry.target}
                />
              ))}
            {token !== null &&
              menuEntriesLoggedIn.map((entry, index) => (
                <NavbarMenuEntry
                  key={index}
                  isMobile={true}
                  href={entry.href}
                  name={entry.name}
                  target={entry.target}
                />
              ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

export { Navbar, type MenuEntry };
