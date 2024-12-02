import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMoon } from "react-icons/fa6";
import { FaSearch, FaBars, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("🇬🇧 English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <>
      <header className="header flex items-end md:items-start justify-between md:px-20 px-4 pb-2 bg-sky-bg">
        <div className="logo justify-center w-full md:w-auto">
          <Link to="/">
            <img
              src="https://i.postimg.cc/13JvwsDs/Myapproved-logo.png"
              alt="My Approved Logo"
            />
          </Link>
        </div>
        <button
          className="block md:hidden text-2xl border border-yellow text-yellow px-2 py-1 rounded-md"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <FaBars />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-start gap-4 justify-between w-full">
          <div className="flex items-center justify-start gap-2 mt-2 rounded-lg bg-white py-2 px-2 md:w-1/2 md:ms-20">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none"
            />
          </div>

          
          <Link to="/signin" className="button-link">
  Log in
</Link>

<Link to="/signup" className="button-link">
  Register
</Link>

          <div className="flex flex-col items-center">
            <div className="buttons pt-2">
             
        
              
              {/* Language Dropdown with Flags */}
              <div className="dropdown">
                <button className="yellow flex items-center text-sm gap-1 font-bold">
                  {selectedLanguage} <FaCaretDown className="text-xs text-gray-600" />
                </button>
                <div className="dropdown-content">
                  <div onClick={() => handleLanguageChange("🇬🇧 English")} className="dropdown-item">
                    🇬🇧 English
                  </div>
                  <div onClick={() => handleLanguageChange("🇪🇸 Spanish")} className="dropdown-item">
                    🇪🇸 Spanish
                  </div>
                  <div onClick={() => handleLanguageChange("🇫🇷 French")} className="dropdown-item">
                    🇫🇷 French
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="bg-sky-bg flex flex-col items-start gap-4 justify-end px-4">
          <div className="flex items-center justify-start gap-2 mt-2 rounded-lg w-full bg-white py-2 px-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="buttons pt-2">
              {/* Trade Mobile Dropdown */}
              <div className="dropdown">
                <button className="bordered">Trade &#9660;</button>
                <div className="dropdown-content">
                  <Link to="/login" className="text-sm">Log in</Link>
                  <Link to="/register" className="text-sm">Create A New Account</Link>
                </div>
              </div>

              {/* Client Mobile Dropdown */}
              <div className="dropdown">
                <button className="bordered">Client &#9660;</button>
                <div className="dropdown-content">
                  <Link to="/signin" className="text-sm">Login</Link>
                  <Link to="/signup" className="text-sm">Register</Link>
                  <hr />
                  <a href="#">
                    Night Mode <FaMoon />
                  </a>
                </div>
              </div>

              {/* Language Mobile Dropdown */}
              <div className="dropdown">
                <button className="yellow">Language &#9660;</button>
                <div className="dropdown-content">
                  <div onClick={() => handleLanguageChange("🇬🇧 English")} className="dropdown-item">
                    🇬🇧 English
                  </div>
                  <div onClick={() => handleLanguageChange("🇪🇸 Spanish")} className="dropdown-item">
                    🇪🇸 Spanish
                  </div>
                  <div onClick={() => handleLanguageChange("🇫🇷 French")} className="dropdown-item">
                    🇫🇷 French
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
