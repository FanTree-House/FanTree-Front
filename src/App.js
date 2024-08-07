import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/MainPage';
import GroupPage from './components/GroupPage';
import FeedPopup from './components/FeedPopup';
import LoginPage from './components/LoginPage';
import SignupForm from './components/SignupForm';
import EntertainmentCreatePage from "./components/EntertainmentCreatePage";
import ArtistGroupCreatePage from "./components/ArtistGroupCreatePage";
import CreateArtistFeedPage from "./components/CreateArtistFeedPage";
import EnterSignup from "./components/EnterSignup";
import ArtistSignup from "./components/ArtistSignup";
import AdminSignup from "./components/AdminSignup";
import ArtistCreatePage from './components/ArtistAccount/ArtistCreatePage';
import EntertainerPage from './components/Enter/EntertainerPage';
import HomePage from './components/Enter/HomePage';
import ArtistProfile from './components/Enter/ArtistProfile';
import './App.css';

const App = () => {
    return (
        <Router>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li><Link to="/">처음화면으로</Link></li>*/}
            {/*        <li><Link to="/create-artist">아티스트 계정생성</Link></li>*/}
            {/*        <li><Link to="/entertainer-page">엔터테이너먼트 공지사항</Link></li>*/}
            {/*        <li><Link to="/artist-profile/1">아티스트 프로필 조회</Link></li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/group/:groupName" element={<GroupPage/>}/>
                <Route path="/group/:groupName/feed/:feedId" element={<FeedPopup/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupForm/>}/>
                <Route path="/enterSignup" element={<EnterSignup/>}/>
                <Route path="/artistSignup" element={<ArtistSignup/>}/>
                <Route path="/adminSignup" element={<AdminSignup/>}/>
                <Route path="/createenter" element={<EntertainmentCreatePage/>}/>
                <Route path="/creategroup" element={<ArtistGroupCreatePage/>}/>
                <Route path="/artistgroup/:groupName/feed" element={<CreateArtistFeedPage/>}/>
                <Route path="/create-artist" element={<ArtistCreatePage/>}/>
                <Route path="/entertainer-page" element={<EntertainerPage/>}/>
                <Route path="/artist-profile/:id" element={<ArtistProfile/>}/>
                <Route path="/entertainer-page" element={<EntertainerPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
