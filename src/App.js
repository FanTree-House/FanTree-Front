import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCommunityFeed from './components/CreateCommunityFeed';
import CommunityFeeds from './components/CommunityFeeds';
import AddPostPage from './components/AddPostPage'; // 새 페이지 추가

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <CreateCommunityFeed />
                        <CommunityFeeds />
                    </div>
                } />
                <Route path="/add-post" element={<AddPostPage />} /> {/* 새 경로 추가 */}
            </Routes>
        </Router>
    );
};

export default App;
