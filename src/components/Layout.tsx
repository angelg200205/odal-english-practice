import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand-mark">
          <span>O</span>
          ODAL English
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/glossary">Glossary</NavLink>
          <NavLink to="/progress">Progress</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
