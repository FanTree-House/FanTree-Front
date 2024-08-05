import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage'; // 경로 수정
import GroupPage from './components/GroupPage';
import FeedPopup from './components/FeedPopup';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/group/:groupName" element={<GroupPage />} />
            <Route path="/group/:groupName/feed/:feedId" element={<FeedPopup />} /> {/* FeedPopup 경로 추가 */}
            {/* 다른 라우트 추가 */}
        </Routes>
    );
};

export default App;
