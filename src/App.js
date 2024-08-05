import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import GroupPage from './components/GroupPage';
import FeedPopup from './components/FeedPopup';
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import SignupForm from './components/SignupForm';
import EntertainmentCreatePage from "./components/EntertainmentCreatePage";
import ArtistGroupCreatePage from "./components/ArtistGroupCreatePage"; // Import the SignupForm component

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/group/:groupName" element={<GroupPage />} />
            <Route path="/group/:groupName/feed/:feedId" element={<FeedPopup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/createenter" element={<EntertainmentCreatePage />} />
            <Route path="/creategroup" element={<ArtistGroupCreatePage />} />
        </Routes>
    );
};

export default App;