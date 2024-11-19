// Layout.tsx
import { Outlet } from "react-router-dom";
import cloudBackground from '../assets/backgrounds/clouds.png'; // Adjust the import path as needed

const Layout = () => {
  return (
    <section>
      <div
        className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
        style={{
          backgroundImage: `url(${cloudBackground})`,
        }}
      >
        <div className="relative min-h-screen w-full">
          <div className="container mx-auto p-4">
            {/* This is where child routes will be rendered */}
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
