import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import MainPage from './MainPage';
import '../styles/App.css'; 
import AudioToISL from './AudioToIsl';
import TextToISL from './TextToIsl';
import ISLToText from './IslToText';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <div className="content">
        {location.pathname === '/' && (
          <>
            <p>ISl Conversion</p>
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
          <Route path="/audio-to-isl" element={<AudioToISL />} />
          <Route path="/text-to-isl" element={<TextToISL />} />
          <Route path="/isl-to-text" element={<ISLToText />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;