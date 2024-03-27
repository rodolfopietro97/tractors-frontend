/**
 * Header component
 */
function Header(): JSX.Element {
  return (
    <header className='my-10 flex h-auto w-full flex-grow flex-col items-center justify-center'>
      <div className='container py-10'>
        <h1 className='my-2 text-center text-6xl'>Tractors</h1>
        <p className='my-10 text-center text-sm italic'>
          Breve sottotitolo di descrizione
        </p>
      </div>
    </header>
  );
}

export { Header };
