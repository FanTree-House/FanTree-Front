import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import GroupPage from './components/GroupPage';
import FeedPopup from './components/FeedPopup';
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import SignupForm from './components/SignupForm'; // Import the SignupForm component

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/group/:groupName" element={<GroupPage />} />
            <Route path="/group/:groupName/feed/:feedId" element={<FeedPopup />} />
            <Route path="/login" element={<LoginPage />} /> {/* Add route for login page */}
            <Route path="/signup" element={<SignupForm />} /> {/* Add route for signup page */}
        </Routes>
    );
};

export default App;