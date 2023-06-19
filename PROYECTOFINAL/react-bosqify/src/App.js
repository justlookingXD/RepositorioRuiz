import './Resources/Styles/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Topbar from './Components/HTML/topbar';
import Main from './Components/HTML/main';
import AboutMe from './Components/HTML/aboutme';
import Favorites from './Components/HTML/favorites';
import "@madzadev/audio-player/dist/index.css";
import Uploads from './Components/HTML/uploads';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRememberMeCheckDone, setIsRememberMeCheckDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('rememberMeCookie') && !sessionStorage.getItem('access_token')) {
      Cookies.remove('access_token');
      setIsLoggedIn(false);
    } else {
      const sessionToken = sessionStorage.getItem('access_token');
      const cookieToken = Cookies.get('access_token');
      if (sessionToken || cookieToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    setIsRememberMeCheckDone(true);
  }, []);

  return (
    <div id="main-page">
      <div id="wrapper">
        <Topbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/subidas" element={<Uploads />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
