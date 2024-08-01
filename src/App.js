// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EntertainmentCreatePage from './components/EntertainmentCreatePage';
import CreateGroupPage from "./components/ArtistGroupCreatePage";
import GroupPage from './components/GroupPage';
import { getAllArtistGroups, fetchGroupDetails, fetchArtistFeeds, subscribeToGroup } from './services/groupService';
import ArtistGroupCreatePage from "./components/ArtistGroupCreatePage";
import CreateArtistFeedPage from "./components/CreateArtistFeedPage";

function App() {
    const [enterName, setEnterName] = useState('');
    const [artistGroups, setArtistGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistGroups = async () => {
            if (enterName) {
                try {
                    const groups = await getAllArtistGroups(enterName);
                    setArtistGroups(groups);
                } catch (error) {
                    console.error('그룹 불러오기 실패:', error);
                }
            }
        };

        fetchArtistGroups();
    }, [enterName]);

    const handleEntertainmentCreation = (createdEnterName) => {
        setEnterName(createdEnterName);
        // 생성된 엔터테인먼트로 이동할 로직 추가 필요시
        navigate(`/group/${createdEnterName}`);
    };

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/create-entertainment"
                    element={<EntertainmentCreatePage onEnterCreate={handleEntertainmentCreation} />}
                />
                <Route path="/group/:groupName" element={<GroupPage enterName={enterName} />} />
                <Route path="/creategroup/:enterName" element={<ArtistGroupCreatePage />} />
                <Route path="/creatArtistFeed" element={<CreateArtistFeedPage />} />
            </Routes>
            <div>
                <h2>Existing Artist Groups</h2>
                <ul>
                    {artistGroups.map((group) => (
                        <li key={group.id}>
                            <a href={`/group/${group.groupName}`}>
                                {group.groupName}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;