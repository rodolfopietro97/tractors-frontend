import { useEffect, useMemo, useState } from 'react';
import {
  faFile,
  faFolder,
  faPlusCircle,
  faMinusCircle,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPdfFileUri } from '@/utils/coder';
import { NodeElement } from '@/app/components/TreeView/types.d';
import {
  getAllFilesOfANode,
  nodeHasSubFolders,
  pathArrayToObject,
} from '@/utils';
import {
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * Default FolderList component.
 * Given a node, it will render a list of the children folders.
 */
function FoldersList({
  node,
  setFilesToShow,
  isRootNode,
}: {
  node: NodeElement;
  setFilesToShow: (files: NodeElement[]) => void;
  isRootNode: boolean;
}): JSX.Element {
  // Show or not the children folders hook
  const [showChildrenFolders, setShowChildrenFolders] = useState<boolean>(true);

  // Understood if the folder has subfolders or not.
  const hasSubFolders = useMemo<boolean>(() => nodeHasSubFolders(node), [node]);

  /**
   * List of the children the folder (if the element is a folder)
   */
  const ChildrenElements = node.children.map((child, index) => {
    return (
      <FoldersList
        key={index}
        node={child}
        setFilesToShow={setFilesToShow}
        // Children folders are not root folders
        isRootNode={false}
      />
    );
  });

  // Element is a folder
  if (node.children.length > 0)
    return (
      // List of folders
      <div className='flex flex-col justify-items-start'>
        {/*Folder buttons*/}
        <div className='flex flex-row'>
          {/*Show or hide children folders button*/}
          {hasSubFolders && (
            <button
              onClick={() => {
                // Show or hide children folders
                setShowChildrenFolders(!showChildrenFolders);
              }}
            >
              {/*Plus and minus simbols for folders*/}
              <FontAwesomeIcon
                icon={showChildrenFolders ? faMinusCircle : faPlusCircle}
                className='mr-2 h-4'
              />
            </button>
          )}
          {/*Folder button*/}
          <button
            className={clsx({
              'my-2 flex flex-row hover:underline': true,
              'ml-2': hasSubFolders,
              'ml-4': !hasSubFolders,
            })}
            onClick={() => {
              // If the folder is the root folder, we need to show all files
              if (isRootNode) setFilesToShow(getAllFilesOfANode(node));
              // Set files to show (the files of the folder)
              else setFilesToShow(node.children);
            }}
          >
            {/*Folder icon*/}
            <FontAwesomeIcon className='mr-2 h-6' icon={faFolder} />

            {/*Folder name*/}
            {node.element.relativePath}
          </button>
        </div>

        {/*Other folders - recursive part*/}
        {showChildrenFolders && <div className='ml-7'>{ChildrenElements}</div>}
      </div>
    );

  // Element is a file. Don't show anything
  return <></>;
}

/**
 * File element.
 * It will render a single file element.
 */
function FileElement({ node }: { node: NodeElement }): JSX.Element {
  // Link to the file
  const fileLink = useMemo<string>(() => getPdfFileUri(node), [node]);

  // File element
  return (
    <Link
      className='my-3 flex flex-col justify-center text-center hover:underline'
      href={fileLink}
      target='_blank'
    >
      <FontAwesomeIcon icon={faFile} className={'h-12'} />
      {node.element.relativePath}
    </Link>
  );
}

/**
 * List of files to shown when a folder is clicked.
 */
function FilesList({
  filesToShow,
}: {
  filesToShow: NodeElement[];
}): JSX.Element {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacingX='10px'>
      {filesToShow.map((file, index) => {
        // Don't show folders
        if (file.children.length === 0)
          return <FileElement key={index} node={file} />;
      })}
    </SimpleGrid>
  );
}

/**
 * Represents a tree node.
 * It is a recursive component.
 * It will render a folder list (on the left) and its children (on the right).
 */
function TreeNode({ node }: { node: NodeElement }): JSX.Element {
  // Files to show into the lateral right panel
  const [filesToShow, setFilesToShow] = useState<NodeElement[]>([]);

  // Search input value
  const [searchValue, setSearchValue] = useState<string>('');

  // Sort files to show by name
  const sortedFilesToShow = useMemo<NodeElement[]>(
    () =>
      filesToShow
        // Sort files by name
        .sort((element1, element2) =>
          element1.element.relativePath.localeCompare(
            element2.element.relativePath
          )
        )
        // Filter files by search value
        .filter((element) =>
          element.element.relativePath
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ),
    [filesToShow, searchValue]
  );

  // Initial files to show effect
  useEffect(() => {
    // Set the files to show to all files of the initial node
    setFilesToShow(getAllFilesOfANode(node));
  }, []);

  return (
    // Main container. It is a flex container with two columns, and two rows (if mobile)
    <div className='flex w-screen flex-col justify-center md:h-[calc(100vh-60px)] md:flex-row'>
      {/*Search bar AND List of folders*/}
      <div className='flex h-[calc((100vh-60px)/2)] flex-col overflow-x-scroll overflow-y-scroll border-b-2 border-r-0 px-5 py-10 md:h-full md:w-1/3 md:border-b-0 md:border-r-2'>
        {/*Search bar*/}
        <InputGroup className='mb-7'>
          <InputLeftElement pointerEvents='none'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='mx-2 h-4' />
          </InputLeftElement>
          <Input
            id='search'
            type='text'
            placeholder='Cerca'
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
        {/*List of folders*/}
        <FoldersList
          node={node}
          setFilesToShow={setFilesToShow}
          // First folder is a root folder
          isRootNode={true}
        />
      </div>

      {/*List of files when a folder is clicked*/}
      <div className='h-[calc((100vh-60px)/2)] w-full overflow-y-scroll py-10 md:h-full md:w-2/3'>
        <FilesList filesToShow={sortedFilesToShow} />
      </div>
    </div>
  );
}

/**
 * Default TreeView component.
 * Given a list of paths, it will render a tree view.
 */
function TreeView({ paths }: { paths: Array<string> }): JSX.Element {
  /**
   * Path object.
   * It is a tree representation of the paths.
   * Every element is a NodeElement.
   */
  const pathObject = useMemo<NodeElement>(
    // Remove first element (root), 'brands' folder and 'brand_name' folder
    () => pathArrayToObject(paths).children[0].children[0].children[0],
    [paths]
  );

  // Render the tree
  return <TreeNode node={pathObject} />;
}

export { TreeView, TreeNode };
