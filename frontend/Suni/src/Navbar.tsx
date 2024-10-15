import bgImage from './assets/images/suni-text-logo3.png';

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
                    <a href="#">Home</a>
                </button>
              </li>
              <li>
                <button className="nav-button">
                     <a href="#">Iteneraries</a>
                </button>  
              </li>
              <li>
                <button className="nav-button">
                    <a href="#">About</a>
                </button>
              </li>
            </ul>
          </nav>
        </>
    );
  }
  
  export default Navbar