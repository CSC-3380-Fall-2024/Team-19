import bgImage from './assets/images/suni-text-logo.png';

function Navbar() {
    return (
        <>
          <nav className="nav">
            <ul>
              <li>
                <img className="nav-image" src={bgImage} alt="Logo"></img>
              </li>
              <li>
                <button className="nav-button">
                    <a href="/">Home</a>
                </button>
              </li>
              <li>
                <button className="nav-button">
                     <a href="/quizPage">Quiz</a>
                </button>  
              </li>
              <li>
                <button className="nav-button">
                    <a href="/calendarPage">Calendar</a>
                </button>
              </li>
              <li>
                <button className="nav-button">
                     <a href="/businessAppPage">BusinessApp</a>
                </button>  
              </li>
              <li>
                <button className="nav-button">
                    <a href="/accountPage">Account</a>
                </button>
              </li>
            </ul>
          </nav>
        </>
    );
  }


  // function CustomLink ({href, children, ...props}){
  //   const path = window.location.pathname

  //   return (
  //     <li>
  //       <a href={href}>{children}</a>
  //     </li>
      
  //   )
  // }


  
  export default Navbar