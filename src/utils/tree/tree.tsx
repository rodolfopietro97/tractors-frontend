import { NodeElement } from '@/app/components/TreeView';

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
    id: 0,
  };

  let currentNodeId = 0;
  paths.forEach((path) => {
    const parts = path.split('/');
    let current = root;

    parts.forEach((part) => {
      let child = current.children.find(
        (child) => child.element.relativePath === part
      );

      if (!child) {
        child = {
          element: { relativePath: part, file: path },
          children: [],
          id: ++currentNodeId,
        };
        current.children.push(child);
      }

      current = child;
    });
  });

  return root;
}

/**
 * Get all files from a node.
 * A node can be a folder or a file.
 * Basically, it will return all files from the children of the node.
 *
 * @param node Node to get files from
 * @returns Array of nodes that are ONLY files (not folders)
 */
function getAllFilesOfANode(node: NodeElement): NodeElement[] {
  // If the node has a children - Recursive case
  if (node.children.length > 0) {
    // Get all files from children
    return node.children.flatMap((child) => getAllFilesOfANode(child));
  }
  // Return the node itself - Base case
  return [node];
}

/**
 * Understood if the folder has subfolders or not.
 *
 * @param node Node to check
 * @returns True if the node has subfolders, else false
 */
function nodeHasSubFolders(node: NodeElement): boolean {
  // Has some children
  if (node.children.length > 0) {
    // Get the children that have children (folders)
    const foldersChildren = node.children.filter(
      (child) => child.children.length > 0
    );
    return foldersChildren.length > 0;
  }
  return false;
}

export { pathArrayToObject, getAllFilesOfANode, nodeHasSubFolders };
