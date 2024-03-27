import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Overlay } from '../../Overlay';

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
      className='from-buttonGradientFrom to-buttonGradientTo text-buttonTextColor hover:to-buttonGradientFrom hover:from-buttonGradientTo flex-inline border-buttonBorderColor hover:text-buttonTextColorHover flex flex w-full justify-center rounded-full border bg-gradient-to-r px-3 py-2 uppercase hover:bg-slate-200'
      {...rest}
    >
      {isLoading && <Overlay className='h-4' />}
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
      className='from-buttonGradientFrom to-buttonGradientTo text-buttonTextColor hover:to-buttonGradientFrom hover:from-buttonGradientTo flex-inline border-buttonBorderColor hover:text-buttonTextColorHover flex flex w-full justify-center rounded-full border bg-gradient-to-r px-3 py-2 uppercase hover:bg-slate-200'
    >
      {children}
      {icon && <FontAwesomeIcon icon={icon} className='h-4' />}
    </Link>
  );
}

export { Button, LinkButton };
