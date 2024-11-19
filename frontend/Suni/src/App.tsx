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
import AccountPage from './pages/AccountPage.tsx';
import PersistLogin from "./components/PersistLogin.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from './components/Layout.tsx';
import RequireAuth from './components/RequireAuth.tsx';

function App() {


  return (

    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<PersistLogin/>}>
                {/* public route*/}
                <Route path="accountPage" element={<AccountPage />}/>
              {/* protect these routes */}
              <Route element={<RequireAuth />}>
                <Route index element={<Home/>}/>
                <Route path="quizPage" element={<QuizPage/>}/>
                <Route path="calendarPage" element={<CalendarPage/>}/>
                <Route path="businessAppPage" element={<BusinessAppPage/>}/>
              </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

//<Header />
// <Form />
//<Footer /> 

export default App

 {/*<section>*/}
        {/*  <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"*/}
        {/*       style={{*/}
        {/*         backgroundImage: `url(${cloudBackground})`*/}
        {/*       }}>*/}
        {/*    <div className="relative min-h-screen w-full">*/}
        {/*      /!*scrollable content goes here *!/*/}
        {/*      <div className="container mx-auto p-4">*/}
        {/*        {Component}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}