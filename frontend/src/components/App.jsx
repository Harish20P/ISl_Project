import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import MainPage from './MainPage';
import TextToISL from './TextToIsl';
import ISLToText from './IslToText';
import About from './About';
import Contact from './Contact';
import AudioToISL from "./AudioToIsl";
import TextToAlnum from './TextToAlnum';
import TextToWord from './TextToWord';
import AlnumToText from './AlnumToText';
import WordToText from './WordToText';
import '../styles/App.css'; 

function App() {
  const location = useLocation();
  
  // Effect to update body scroll behavior based on the active route
  useEffect(() => {
    if (location.pathname === '/contact') {
      document.body.style.overflowY = 'auto'; // Enable scrolling
    } else {
      document.body.style.overflowY = 'hidden'; // Disable scrolling for other routes
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <div className="content">
        {location.pathname === '/' && (
          <>
            <p>ISL Conversion</p>
            <div className="button-group">
              <Link to="/login"><button className="login-btn">Login</button></Link>
              <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
            </div>
          </>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/text-to-alnum" element={<TextToAlnum />} />
          <Route path="/text-to-word" element={<TextToWord />} />
          <Route path="/audio-to-isl" element={<AudioToISL />} />
          <Route path="/alnum-to-text" element={<AlnumToText />} />
          <Route path="/word-to-text" element={<WordToText />} />
          <Route path="/text-to-isl" element={<TextToISL />} />
          <Route path="/isl-to-text" element={<ISLToText />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;