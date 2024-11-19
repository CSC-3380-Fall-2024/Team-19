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
import Layout from './components/Layout.tsx';
import RequireAuth from './components/RequireAuth.tsx';

function App() {


  return (

    <>
      <Navbar/>
      <Routes>

        <Route element={<Layout />}>
          <Route element={<PersistLogin/>}>
                {/* public route*/}
              <Route path="/" element={<Home/>}/>
              <Route path="accountPage" element={<AccountPage />}/>
              <Route path="businessAppPage" element={<BusinessAppPage/>}/>
              {/* protect these routes */}
              <Route element={<RequireAuth />}>

                <Route path="quizPage" element={<QuizPage/>}/>
                <Route path="calendarPage" element={<CalendarPage/>}/>
              </Route>
          </Route>

        </Route>
      </Routes>
    </>
  );
}



export default App