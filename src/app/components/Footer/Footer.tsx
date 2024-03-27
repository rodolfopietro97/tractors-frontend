import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { MenuEntry } from '../Navbar';

/**
 * Footer menu entry
 */
function FooterMenuEntry({ href, name, target }: MenuEntry): JSX.Element {
  return (
    <div className='my-3 md:my-1'>
      <Link
        className='mx-4 text-sm uppercase text-gray-600 hover:underline'
        href={href}
        target={target}
      >
        {name}
      </Link>
    </div>
  );
}

/**
 * Main Footer component
 */
function Footer({
  footerMenuEntries,
}: {
  footerMenuEntries: Array<MenuEntry>;
}): JSX.Element {
  return (
    <footer className='flex w-full flex-col text-center'>
      {/* Social icons */}
      <div className='my-3 flex flex-row items-center justify-center py-3'>
        <Link className='duration-300 hover:text-gray-400' href='#'>
          <FontAwesomeIcon icon={faFacebook} className='mx-2 h-6' />
        </Link>
        <Link className='duration-300 hover:text-gray-400' href='#'>
          <FontAwesomeIcon icon={faInstagram} className='mx-2 h-6' />
        </Link>
        <Link className='duration-300 hover:text-gray-400' href='#'>
          <FontAwesomeIcon icon={faLinkedin} className='mx-2 h-6' />
        </Link>
      </div>

      {/* Footer menu */}
      <div className='my-3 flex flex-col items-center justify-center py-3 md:flex-row'>
        {footerMenuEntries.map((entry, index) => {
          return (
            <FooterMenuEntry
              key={index}
              href={entry.href}
              name={entry.name}
              target={entry.target}
            />
          );
        })}
      </div>

      {/* Copyright */}
      <div className='my-4 text-xs uppercase text-gray-500'>
        <p>Copyright &copy; Tractors {new Date().getFullYear().toString()}</p>
      </div>
    </footer>
  );
}

export { Footer };
