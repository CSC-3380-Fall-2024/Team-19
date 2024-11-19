// import { useState } from 'react';
import bgImage from './assets/images/suni-text-logo.png';
import {Link} from "react-router-dom";

function Navbar() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  return (
      <header className="bg-blue-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Logo Section */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 hover:border-2 hover:bg-gray-300 rounded-lg">
              <span className="sr-only">Company</span>
              <img className="h-19 w-auto" src={bgImage} alt="Logo"/>
            </Link>
          </div>

          {/* Links Section for Desktop */}
          <div className="hidden lg:flex lg:gap-x-12">
            {/* Hamburger Dropdown */}

            {/*NOT BEING USED AT THE MOMENT*/}
            {/*<div className="relative">*/}
            {/*  <button*/}
            {/*      onClick={toggleDropdown}*/}
            {/*      className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"*/}
            {/*  >*/}
            {/*    Menu*/}
            {/*  </button>*/}
            {/*  {isDropdownOpen && (*/}
            {/*      <div className="absolute left-0 mt-2 w-40 rounded-lg bg-white shadow-lg ring-1 ring-gray-300">*/}
            {/*        <Link*/}
            {/*            to="/section1"*/}
            {/*            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"*/}
            {/*        >*/}
            {/*          Section 1*/}
            {/*        </Link>*/}
            {/*        <Link*/}
            {/*            to="/section2"*/}
            {/*            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"*/}
            {/*        >*/}
            {/*          Section 2*/}
            {/*        </Link>*/}
            {/*        <Link*/}
            {/*            to="/section3"*/}
            {/*            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"*/}
            {/*        >*/}
            {/*          Section 3*/}
            {/*        </Link>*/}
            {/*      </div>*/}
            {/*  )}*/}
            {/*</div>*/}

            <Link to="/quizPage"
                  className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">Quiz</Link>
            <Link to="/calendarPage"
               className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">Calendar</Link>
            <Link to="/businessAppPage"
               className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">BusinessApp</Link>
          </div>

          {/* Log In Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/accountPage"
               className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">Log
              in <span aria-hidden="true">&rarr;</span></Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div
              className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-slate-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <div className="bg-blue-100 p-2 rounded-lg flex items-center">
                  <img className="h-8 w-auto" src={bgImage} alt="Logo"/>
                  <span className="ml-2 text-sm font-semibold text-gray-900"> </span>
                </div>
              </Link>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to="/quizPage"
                     className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">Quiz</Link>
                  <Link to="/calendarPage"
                     className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">Calendar</Link>
                  <a href="/businessAppPage"
                     className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">BusinessApp</a>
                </div>
                <div className="py-6">
                  <Link to="/accountPage"
                     className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">Log
                    in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}
export default Navbar
