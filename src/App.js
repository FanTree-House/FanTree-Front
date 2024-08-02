import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import EntertainmentCreatePage from './components/EntertainmentCreatePage';
import ArtistGroupCreatePage from "./components/ArtistGroupCreatePage";
import GroupPage from './components/GroupPage';
import CreateArtistFeedPage from "./components/CreateArtistFeedPage";
import { getAllArtistGroups } from './services/createGroupService';
import './App.css';

function App() {
    const [enterName, setEnterName] = useState('');
    const [groupName, setGroupName] = useState();
    const navigate = useNavigate();


    const handleEntertainmentCreation = (createdEnterName) => {
        setEnterName(createdEnterName);
        navigate(`/group/${createdEnterName}`);
    };

    return (
        <div className="App">
            <nav className="navbar">
                <ul>
                    <li>
                        <NavLink to="/create-entertainment" className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Create Entertainment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/creategroup/${enterName}`} className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Create Group
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/artistgroup/${groupName}/feed`} className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Create Artist Feed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/group/${enterName}`} className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Artist Groups
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/create-entertainment" element={<EntertainmentCreatePage onEnterCreate={handleEntertainmentCreation} />} />
                <Route path="/group/:groupName" element={<GroupPage enterName={enterName} />} />
                <Route path="/creategroup" element={<ArtistGroupCreatePage />} />
                <Route path="/artistgroup/:groupName/feed" element={<CreateArtistFeedPage />} />
            </Routes>

        </div>
    );
}

export default App;