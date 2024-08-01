import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import EntertainmentCreatePage from './components/EntertainmentCreatePage';
import ArtistGroupCreatePage from "./components/ArtistGroupCreatePage";
import GroupPage from './components/GroupPage';
import CreateArtistFeedPage from "./components/CreateArtistFeedPage";
import { getAllArtistGroups } from './services/groupService';
import './App.css'; // 스타일링을 위한 CSS 파일 추가

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
        navigate(`/group/${createdEnterName}`);
    };

    return (
        <div className="App">
            <nav className="navbar">
                <ul>
                    <li>
                        <NavLink to="/create-entertainment" activeClassName="active-link">Create Entertainment</NavLink>
                    </li>
                    <li>
                        <NavLink to="/creategroup/:enterName" activeClassName="active-link">Create Group</NavLink>
                    </li>
                    <li>
                        <NavLink to="/creatArtistFeed" activeClassName="active-link">Create Artist Feed</NavLink>
                    </li>
                </ul>
            </nav>

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
                            <NavLink to={`/group/${group.groupName}`}>
                                {group.groupName}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;