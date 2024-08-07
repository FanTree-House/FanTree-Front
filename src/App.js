import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArtistCreatePage from './components/ArtistCreatePage';
import EntertainerPage from './components/Enter/EntertainerPage';
import HomePage from './components/Enter/HomePage';
import ArtistProfile from './components/Enter/ArtistProfile'; // 새로 추가할 아티스트 프로필 컴포넌트
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">처음화면으로</Link></li>
                        <li><Link to="/create-artist">아티스트 계정생성</Link></li>
                        <li><Link to="/entertainer-page">엔터테이너먼트 공지사항</Link></li>
                        <li><Link to="/artist-profile/1">아티스트 프로필 조회</Link></li> {/* 예시로 id=1 */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-artist" element={<ArtistCreatePage />} />
                    <Route path="/entertainer-page" element={<EntertainerPage />} />
                    <Route path="/artist-profile/:id" element={<ArtistProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
