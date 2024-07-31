import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArtistCreatePage from './components/ArtistCreatePage';
import EntertainerPage from './components/EntertainerPage';
import './App.css';
import HomePage from './components/HomePage'; // 새로 추가할 홈 페이지 컴포넌트

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">처음화면으로</Link></li>
                        <li><Link to="/create-artist">아티스트 계정생성</Link></li>
                        <li><Link to="/entertainer-page">엔터테이너먼트 공지사항</Link></li>
                        <li><Link to="/"/*아티스트 프로필 조회 및 전체 조회*/></Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-artist" element={<ArtistCreatePage />} />
                    <Route path="/entertainer-page" element={<EntertainerPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;