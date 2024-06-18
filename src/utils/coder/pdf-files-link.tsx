import { coder } from '@/utils';
import { NodeElement } from '@/app/components/TreeView';

/**
 * Get the PDF file URI from a node element
 *
 * @param node - Node element to get the PDF file URI from
 * @returns PDF file URI
 */
function getPdfFileUri(node: NodeElement): string {
  const fileUri = encodeURI(node.element.file);
  const fileUriBase64 = coder.encode(fileUri);
  console.log(node.element.file);
  return `/catalog/${fileUriBase64}`;
}

export { getPdfFileUri };
