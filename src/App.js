import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import SignupForm from './components/SignupForm';
import ArtistSignup from "./components/ArtistSignup";
import EnterSignup from "./components/EnterSignup";
import AdminSignup from "./components/AdminSignup";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/artistSignup" element={<ArtistSignup />} />
            <Route path="/enterSignup" element={<EnterSignup />} />
            <Route path="/adminSignup" element={<AdminSignup />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;