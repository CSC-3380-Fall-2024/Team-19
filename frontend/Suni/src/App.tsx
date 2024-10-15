//import Header from './Header.tsx'
import Navbar from './Navbar.tsx'
import Form from './Form.tsx'
import Footer from './Footer.tsx'

import cloudBackground from './assets/backgrounds/clouds.png';

import './global.css'


function App() {

  return (
    <>
      <Navbar />
      <section className="background" style={{backgroundImage: `url(${cloudBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
          }}>
        <Form />
        <Footer />
      </section>
    </>
  );
}

//<Header />

export default App