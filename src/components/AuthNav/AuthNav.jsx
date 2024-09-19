import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={css.navContainer}>
      <button className={css.burgerMenu} onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`${css.links} ${isMenuOpen ? css.showMenu : ''}`}>
        <NavLink className={css.link} to="/register" onClick={toggleMenu}>
          Sign Up
        </NavLink>
        <NavLink className={css.link} to="/login" onClick={toggleMenu}>
          Sign In
        </NavLink>
      </nav>
    </div>
  );
};
