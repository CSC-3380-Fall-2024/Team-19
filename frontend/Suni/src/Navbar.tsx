import React, { useState , useContext} from 'react';
import { Link } from "react-router-dom";
import bgImage from './assets/images/suni-text-logo.png';
import userIconDefault from './assets/images/user-icon-default.png';

//get user login authentification 
import AuthContext from './context/AuthProvider'; 


import useLogout from './hooks/useLogout.ts'



const Navbar: React.FC = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use the isAuthenticated state from the auth context
  //@ts-ignore 
  const { auth, setAuth } = useContext(AuthContext);

  const signOut = async() => {
    await logout();
    setAuth();
  }
  

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = useLogout();

  return (
    <nav className="bg-sky-blue">
      <div className=" flex flex-wrap items-center justify-between mx-4 p-3">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img className="h-8" src={bgImage} alt="Logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"> {/*Below: ternary operator to display login button or user icon based on user login/ authorization*/}
          {auth ? (  
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
                id="user-menu-button"
                aria-expanded={isUserDropdownOpen}
                onClick={toggleUserDropdown}
              >
                <img className="w-8 h-8" src={userIconDefault} alt="userIcon" />
              </button>
              {/* Dropdown menu */}
              <div
                className={`z-50 ${
                  isUserDropdownOpen ? '' : 'hidden'
                } absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow bg-sky-blue`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">{auth.user}</span>
                  <span className="block text-sm text-gray-500 truncate ">email@email.com</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/calendarPage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Calendars
                    </Link>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                      onClick={signOut}
                      >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
              {/* Dropdown Menu */}
            </div>
          ) : (
            <>
              <Link to="/accountPage" className="text-white bg-drk-blue hover:bg-drk-2-blue focus:ring-1 focus:outline-none focus:ring-drk-2-blue font-medium rounded-lg text-sm px-6 py-2 text-center">
                Log in
              </Link>
            </>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isMobileMenuOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="bg-sky-blue flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:sky-blue"> {/*Border box for main links(both in main and mini menu*/}
            <li>
              <Link to="/quizPage" className="block py-2 px-3 text-drk-blue rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-drk-2-blue md:p-0 ">
                Quiz
              </Link>
            </li>
            <li>
              <Link to="./calendarPage" className="block py-2 px-3 text-drk-blue rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-drk-2-blue md:p-0 ">
                Calendar
              </Link>
            </li>
            <li>
              <Link to="/businessAppPage" className="block py-2 px-3 text-drk-blue rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-drk-2-blue md:p-0 ">
                BusinessApp
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

