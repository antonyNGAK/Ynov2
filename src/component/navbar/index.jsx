import React from 'react';
import { Link } from 'react-router-dom'; //React Router pour la navigation
import './NavBar.css';

const NavBar = () => {
  return (
    <header>
      <div className="header">
        {/* Logo cliquable redirigeant vers la page d'accueil */}
        <Link to="/">
          <img src="/img/LOGO.jpg" alt="MyLocationApp Logo" className="logo" />
        </Link>
        <h1 className="title">MyLocationApp</h1>
      </div>
    </header>
  );
};

export default NavBar;
