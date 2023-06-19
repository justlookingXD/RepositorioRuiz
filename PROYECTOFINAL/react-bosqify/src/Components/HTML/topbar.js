import '../../Resources/Styles/topbar.css';
import { Link } from 'react-router-dom'; // Importa el componente Link

import React from 'react';
import MUIMenu from '../MUI/MUIMenu';
import MUIModalLogin from '../MUI/MUIModalLogin';
import MUIModalRegister from '../MUI/MUIModalRegister';
import logo from '../../Resources/Assets/img/logo_circle.png';

function Topbar({ isLoggedIn }) {
  const companyName = 'Bosqify';

  return (
    <div id="topbar">
      <Link to="/">
        <div id="companyBox">
          <img id="companyLogo" src={logo} alt="Bosqify" className="logo" />
          <span id="companyTitle">{companyName}</span>
        </div>
      </Link>
      <div id="userBox">
        {isLoggedIn ? <MUIMenu /> : [<MUIModalLogin key="login" />, <MUIModalRegister key="register" />]}
      </div>
    </div>
  );
}

export default Topbar;
