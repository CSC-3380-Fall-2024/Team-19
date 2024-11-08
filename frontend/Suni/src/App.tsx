//import Header from './Header.tsx'
//import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'
//import Form from './Form.tsx'
//import PopOut from './PopOut.tsx'

import cloudBackground from './assets/backgrounds/clouds.png';

import './global.css'

import QuizPage from './pages/QuizPage.tsx';
import CalendarPage from './pages/CalendarPage.tsx';
import BusinessAppPage from './pages/BusinessAppPage.tsx';
import Home from './pages/Home.tsx';


function App() {

  let Component
  switch(window.location.pathname) {
    case "/":
      Component = <Home/>
      break
    case "/quizPage":
      Component = <QuizPage/>
      break
    case "/calendarPage":
      Component = <CalendarPage/>
      break
    case "/businessAppPage":
      Component = <BusinessAppPage/>
      break
  }

  return (
    <>
      <Navbar />
      <section>
        <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
          style={{
          backgroundImage: `url(${cloudBackground})`
        }}>
          <div className="relative min-h-screen w-full">
            {/*scrollable content goes here */}
            <div className="container mx-auto p-4">
            {Component}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

//<Header />
// <Form />
//<Footer /> 

export default App

