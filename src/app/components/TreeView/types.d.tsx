/**
 * NodeElement type for graph representation
 */
type NodeElement = {
  element: { relativePath: string; file: string };
  children: Array<NodeElement>;
  id: number;
};

export { type NodeElement };
