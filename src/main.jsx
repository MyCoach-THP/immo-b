import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeContext from './theme/themecontext'
import MyNavbar from './components/Header/MyNavbar'
import Properties from './pages/Properties';
import Bouton2 from './pages/Bouton2';
import Bouton3 from './pages/Bouton3';
import Login from './pages/Login';
import Register from './pages/Register'
import { useAtom } from 'jotai';
import { authAtom } from './components/atoms'
import Cookies from 'js-cookie';
import ForgotPassword from './pages/forgotPassword';
import Hero from './pages/Hero';
import OwnerDashboard from './pages/OwnerDashboard';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const storedTheme = localStorage.getItem('theme') || 'dark';
  const [theme, setTheme] = useState(storedTheme)
  const [authState, setAuthState] = useAtom(authAtom);

  useEffect(() => {
    const userInfoCookie = Cookies.get('authTokenCookie')
    if (userInfoCookie) {
      console.log(JSON.parse(userInfoCookie))
      const userInfo = JSON.parse(userInfoCookie)
      setAuthState({
        isLoggedIn: true,
        token: userInfo.token,
        user_id: userInfo.user_id,
        username: userInfo.username
      });
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme)
  }

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log("L'utilisateur a accepté l'installation");
        } else {
          console.log("L'utilisateur a refusé l'installation");
        }
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      });
    }
  };

  const handleDismissClick = () => {
    setShowInstallBanner(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="primaryContainer App" id={theme}>
        <Router>
          <MyNavbar />
          <CssBaseline />
          {showInstallBanner && deferredPrompt && (
            <div className="install-banner">
              <div>Simplifiez vos visites</div>
              <button type="button" onClick={handleInstallClick}>
                Installer l&apos;application
              </button>
              <button type="button" onClick={handleDismissClick}>
                Ignorer
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:propertyId" element={<PropertyDetails />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/NewProperty" element={<NewProperty />} />
            <Route path="/EditProperty/:id" element={<EditProperty />} />
            <Route path="/bouton2" element={<Bouton2 />} />
            <Route path="/bouton3" element={<Bouton3 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
