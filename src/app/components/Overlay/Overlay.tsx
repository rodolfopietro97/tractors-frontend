import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Overlay component
 */
function Overlay({ className }: { className: string }): JSX.Element {
  return (
    <FontAwesomeIcon icon={faSpinner} className={className + ' animate-spin'} />
  );
}

export { Overlay };
