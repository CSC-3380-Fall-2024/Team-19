import bgImage from './assets/images/suni-text-logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="nav">
            <ul>
                {/* Logo */}
                <li>
                    <img className="nav-image" src={bgImage} alt="Logo" />
                </li>

                {/* Navigation Links */}
                <li>
                    <button className="nav-button">
                        <Link to="/">Home</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button">
                        <Link to="/quizPage">Quiz</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button">
                        <Link to="/calendarPage">Calendar</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button">
                        <Link to="/businessAppPage">BusinessApp</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button">
                        <Link to="/accountPage">Account</Link>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
