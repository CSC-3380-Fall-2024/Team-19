// import bgImage from './assets/images/suni-text-logo3.png';

// function Navbar() {
//     return (
//         <>
//           <nav className="nav">
//             <ul>
//               <li>
//                 <img className="nav-image" src={bgImage} alt="Logo"></img>
//               </li>
//               <li>
//                 <button className="nav-button">
//                     <a href="/">Home</a>
//                 </button>
//               </li>
//               <li>
//                 <button className="nav-button">
//                      <a href="/quizPage">Quiz</a>
//                 </button>  
//               </li>
//               <li>
//                 <button className="nav-button">
//                     <a href="/calendarPage">Calendar</a>
//                 </button>
//               </li>
//               <li>
//                 <button className="nav-button">
//                      <a href="/businessAppPage">BusinessApp</a>
//                 </button>  
//               </li>
//             </ul>
//           </nav>
//         </>
//     );
//   }


//   // function CustomLink ({href, children, ...props}){
//   //   const path = window.location.pathname

//   //   return (
//   //     <li>
//   //       <a href={href}>{children}</a>
//   //     </li>
      
//   //   )
//   // }


  
//   export default Navbar
/////////////////////////////////////////////////// Haze's old code just in case^^

//Outline from web, tailwind CSS headers

import { useState } from 'react';
import bgImage from './assets/images/suni-text-logo3.png';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 hover:border-2 hover:bg-gray-300 rounded-lg">
            <span className="sr-only">Company</span>
            <img className="h-19 w-auto" src={bgImage} alt="Logo" />
          </a>
        </div>

        {/* Links Section for Desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Hamburger Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
            >
              Menu
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 rounded-lg bg-white shadow-lg ring-1 ring-gray-300">
                <a
                  href="/section1"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Section 1
                </a>
                <a
                  href="/section2"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Section 2
                </a>
                <a
                  href="/section3"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Section 3
                </a>
              </div>
            )}
          </div>

          <a href="/quizPage" className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">Quiz</a>
          <a href="/calendarPage" className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">Calendar</a>
          <a href="/businessAppPage" className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">BusinessApp</a>
        </div>

        {/* Log In Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold text-gray-900 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-300">Log in <span aria-hidden="true">&rarr;</span></a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-slate-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <div className="bg-blue-100 p-2 rounded-lg flex items-center">
                <img className="h-8 w-auto" src={bgImage} alt="Logo" />
                <span className="ml-2 text-sm font-semibold text-gray-900"> </span>
              </div>
            </a>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a href="/quizPage" className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">Quiz</a>
                <a href="/calendarPage" className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">Calendar</a>
                <a href="/businessAppPage" className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">BusinessApp</a>
              </div>
              <div className="py-6">
                <a href="/login" className="block rounded-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
