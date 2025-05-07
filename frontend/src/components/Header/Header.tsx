import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header_logo">EcoFootprint</div>
        <nav className="header_nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            Calculator
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            History
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
