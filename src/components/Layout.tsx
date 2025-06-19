import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="about">About</Link>
      </nav>
      <main>
        <Outlet /> {/* Qui verranno renderizzate le sottoroute */}
      </main>
    </div>
  );
}