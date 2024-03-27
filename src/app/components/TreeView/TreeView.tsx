import { useMemo, useState } from 'react';
import {
  faFile,
  faFolder,
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_URL } from '@/fetchers';
import { coder } from '@/utils/coder';

/**
 * NodeElement type for graph representation
 */
type NodeElement = {
  element: { relativePath: string; file: string };
  children: Array<NodeElement>;
};

/**
 * Convert an array of paths to an object
 *
 * @param paths Array of paths
 * @returns NodeElement object
 */
function pathArrayToObject(paths: Array<string>): NodeElement {
  const root: NodeElement = {
    element: { relativePath: '', file: '' },
    children: [],
  };

  paths.forEach((path) => {
    const parts = path.split('/');
    let current = root;

    parts.forEach((part) => {
      let child = current.children.find(
        (child) => child.element.relativePath === part
      );

      if (!child) {
        child = { element: { relativePath: part, file: path }, children: [] };
        current.children.push(child);
      }

      current = child;
    });
  });

  return root;
}

function TreeEntryButton({
  node,
  showChildren,
  setShowChildren,
  children,
}: {
  node: NodeElement;
  showChildren: boolean;
  setShowChildren: (showChildren: boolean) => void;
  children: JSX.Element;
}): JSX.Element {
  // Router
  const router = useRouter();

  // Brand name
  const brandName = useMemo<string>(() => {
    if (!router.query.brandDetailOptions) return '';
    return router.query.brandDetailOptions[0] as string;
  }, [router.query.brandDetailOptions]);

  // Link to file
  const fileLink = useMemo<string>(() => {
    const fileUri = encodeURI(node.element.file);
    const fileUriBase64 = coder.encode(fileUri);
    return `/catalog/${fileUriBase64}`;
  }, [node.element.file, brandName]);

  return (
    <>
      {node.children.length > 0 ? (
        /*Entry - Button folder*/
        <button
          onClick={() => setShowChildren(!showChildren)}
          className={clsx({
            'my-2': node.children.length > 0,
            'my-1': node.children.length === 0,
            'hover:underline': node.children.length === 0,
          })}
        >
          {children}
          {node.element.relativePath}
        </button>
      ) : (
        /*Link - Button file*/
        <>
          <Link href={fileLink} target='_blank' className={'hover:underline'}>
            {children}
            {node.element.relativePath}
          </Link>
        </>
      )}
    </>
  );
}

/**
 * Default TreeNode component
 */
function TreeNode({
  node,
  level,
}: {
  node: NodeElement;
  level: number;
}): JSX.Element {
  // Show or hide children
  const [showChildren, setShowChildren] = useState<boolean>(true);

  return (
    <div>
      {/*Entry*/}
      {node.element.relativePath !== '' && ( // Avoid null element root
        <TreeEntryButton
          node={node}
          showChildren={showChildren}
          setShowChildren={setShowChildren}
        >
          <>
            {/*Plus and minus simbols for folders*/}
            {node.children.length > 0 && (
              <FontAwesomeIcon
                icon={showChildren ? faMinusCircle : faPlusCircle}
                className='mr-2 h-6'
              />
            )}

            {/*Folder or file icon*/}
            <FontAwesomeIcon
              icon={node.children.length > 0 ? faFolder : faFile}
              className={clsx({
                'mr-2': true,
                'h-6': node.children.length > 0,
                'h-10': node.children.length > 0 && level === 2,
              })}
            />
          </>
        </TreeEntryButton>
      )}

      {/*Children*/}
      {node.children.length > 0 && showChildren && (
        <div className='ml-10'>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Default TreeView component.
 * Given a list of paths, it will render a tree view.
 */
function TreeView({ paths }: { paths: Array<string> }): JSX.Element {
  const pathsObject = useMemo<NodeElement>(
    () => pathArrayToObject(paths),
    [paths]
  );

  return <TreeNode node={pathsObject} level={0} />;
}

export { TreeView, TreeNode };
