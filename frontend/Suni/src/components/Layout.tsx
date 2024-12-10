import { Outlet } from "react-router-dom";
//import cloudBackground from '../assets/backgrounds/clouds.png'; 

const Layout = () => {
  return (
    <section>    
            <Outlet />  
    </section>
  );
};

export default Layout;