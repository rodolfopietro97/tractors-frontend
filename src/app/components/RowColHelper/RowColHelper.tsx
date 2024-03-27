/**
 * Rows and Columns helper in order to simplify forms
 */
function RowColHelper({
  children,
  classNames,
  className,
}: {
  children: Array<JSX.Element>;
  classNames: Array<string>;
  className: string;
}): JSX.Element {
  return (
    <div className={className}>
      {classNames.map((className, index) => (
        <div key={index} className={className}>
          {children[index]}
        </div>
      ))}
    </div>
  );
}

export { RowColHelper };
