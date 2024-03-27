/**
 * Article component
 */
function Article({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <article className='my-28 flex flex-col justify-center border border-b-0 border-l-2 border-r-2 border-t-0 bg-article py-28 text-center'>
      {children}
    </article>
  );
}

export { Article };
