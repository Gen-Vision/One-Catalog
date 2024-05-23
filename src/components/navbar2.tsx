// Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo2, dlogout, mllanguage } from '../assets/logo';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const languages = ['en', 'fr', 'hi', 'bn'];

  const handleLogOut = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <nav
      className="mt-2 navbar-hover-glow"
      style={{ borderBottom: '1px solid #ccc', paddingTop: '10px', marginRight: '10px' }}
    >
      <div style={{ marginLeft: '40px' }}>
        <img className="inline-block align-middle pb-8" src={logo2} alt="Gen_Vision" />
        <div className="float-right">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img className="inline-block align-middle pr-8 pb-8" src={mllanguage} alt="multi language" />
          </button>

          {/* Language option */}
          {isOpen && (
            <div className="absolute right-0 top-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-2">
              {languages.map((lng) => (
                <button
                  key={lng}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => changeLanguage(lng)}
                >
                  {lng}
                </button>
              ))}
            </div>
          )}

          <button onClick={handleLogOut} className="relative group">
            <img className="inline-block align-middle pr-4 pb-8" src={dlogout} alt="logout" />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
