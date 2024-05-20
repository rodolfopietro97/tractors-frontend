import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Spinner } from '@chakra-ui/react';

/**
 * Button component
 */
function Button({
  isLoading,
  icon,
  children,
  ...rest
}: {
  isLoading?: boolean;
  icon?: IconProp;
} & React.ComponentPropsWithRef<'button'>): JSX.Element {
  return (
    <button
      disabled={isLoading}
      className='flex-inline flex flex w-full justify-center rounded-full border border-buttonBorderColor bg-gradient-to-r from-buttonGradientFrom to-buttonGradientTo px-3 py-2 uppercase text-buttonTextColor hover:bg-slate-200 hover:from-buttonGradientTo hover:to-buttonGradientFrom hover:text-buttonTextColorHover'
      {...rest}
    >
      {isLoading && (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='sm'
        />
      )}
      {children}
      {icon && <FontAwesomeIcon icon={icon} className='h-4' />}
    </button>
  );
}

/**
 * Link button component
 */
function LinkButton({
  onClick,
  icon,
  children,
  href,
  target,
}: {
  onClick?: () => void;
  icon?: IconProp;
  children: ReactNode;
  href: string;
  target?: string;
}): JSX.Element {
  return (
    <Link
      onClick={onClick}
      href={href}
      target={target}
      className='flex-inline flex flex w-full justify-center rounded-full border border-buttonBorderColor bg-gradient-to-r from-buttonGradientFrom to-buttonGradientTo px-3 py-2 uppercase text-buttonTextColor hover:bg-slate-200 hover:from-buttonGradientTo hover:to-buttonGradientFrom hover:text-buttonTextColorHover'
    >
      {children}
      {icon && <FontAwesomeIcon icon={icon} className='h-4' />}
    </Link>
  );
}

export { Button, LinkButton };
