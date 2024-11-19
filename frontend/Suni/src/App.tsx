//import Header from './Header.tsx'
//import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'
//import Form from './Form.tsx'
//import PopOut from './PopOut.tsx'

import './global.css'

import QuizPage from './pages/QuizPage.tsx';
import CalendarPage from './pages/CalendarPage.tsx';
import BusinessAppPage from './pages/BusinessAppPage.tsx';
import Home from './pages/Home.tsx';
import AccountPage from './pages/AccountPage.tsx';
import PersistLogin from "./components/PersistLogin.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {


  return (

      <BrowserRouter>
          <Navbar/>
      <Routes>
        <Route element={<PersistLogin/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="accountPage" element={<AccountPage/>}/>
            <Route path="/quizPage" element={<QuizPage/>}/>
            <Route path="/calendarPage" element=<CalendarPage/>/>
            <Route path="/businessAppPage" element=<BusinessAppPage/>/>
        </Route>
      </Routes>
      </BrowserRouter>
  );
}



export default App


        /*<section>*/
        /*  <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"*/
        /*       style={{*/
        /*         backgroundImage: `url(${cloudBackground})`*/
        /*       }}>*/
        /*    <div className="relative min-h-screen w-full">*/
        /*      /!*scrollable content goes here *!/*/
        /*      <div className="container mx-auto p-4">*/
        /*        {Component}*/
        /*      </div>*/
        /*    </div>*/
        /*  </div>*/ 
        /*</section>*/