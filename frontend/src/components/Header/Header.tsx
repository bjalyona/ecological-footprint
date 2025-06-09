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
            Главная
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            Калькулятор
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            История
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "header_link-active" : "header_link"
            }
          >
            Профиль
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
