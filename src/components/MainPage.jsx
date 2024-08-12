import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistGroupService from '../service/ArtistGroupService';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import { useAuthDispatch } from '../context/AuthContext';
import './MainPage.css';

const MainPage = () => {
    const dispatch = useAuthDispatch();
    const [artistGroups, setArtistGroups] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [artistProfiles, setArtistProfiles] = useState([]);

    useEffect(() => {
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        if (!hasRefreshed) {
            window.location.reload();
            localStorage.setItem('hasRefreshed', 'true');
        }
        return () => {
            localStorage.removeItem('hasRefreshed');
        };
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getArtistGroups();
                setArtistGroups(data || []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching artist groups:', error);
            }
        };

        const fetchAllArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getAllArtistGroups();
                setArtistProfiles(data || []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching all artist groups:', error);
            }
        };

        fetchArtistGroups();
        fetchAllArtistGroups();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (artistGroups.length === 0) return 0; // Prevent updating if no groups
                if (prevIndex >= Math.floor((artistGroups.length - 2) / 2)) {
                    return 0;
                }
                return prevIndex + 1;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [artistGroups]);

    const getCurrentGroups = () => {
        const start = currentIndex * 2;
        return artistGroups.slice(start, start + 2);
    };

    return (
        <div className="main-page">
            <header className="header">
                <Header />
            </header>
            <div className="main-content">
                <div className="ranking-section">
                    <h2>아티스트 그룹 랭킹</h2>
                    <ul className="ranking-list">
                        {artistGroups.length > 0 && (
                            <>
                                <li key={artistGroups[0]?.id} className="ranking-item first">
                                    <span className="ranking-position">1위</span>
                                    <img src={artistGroups[0]?.artistGroupProfileImageUrl} alt={artistGroups[0]?.groupName} className="artist-image"/>
                                    <span className="group-name">{artistGroups[0]?.groupName}</span>
                                    <span className="subscribe-count">구독자 수 : {artistGroups[0]?.subscribeCount}</span>
                                </li>
                                {getCurrentGroups().map((group, index) => (
                                    <li key={group?.id} className="ranking-item">
                                        <span className="ranking-position">{currentIndex * 2 + index + 2}위</span>
                                        <img src={group?.artistGroupProfileImageUrl} alt={group?.groupName} className="artist-image"/>
                                        <span className="group-name">{group?.groupName}</span>
                                        <span className="subscribe-count">구독자 수 : {group?.subscribeCount}</span>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="profile-section">
                <h2>아티스트 프로필</h2>
                <ul className="profile-list">
                    {artistProfiles.length > 0 ? (
                        artistProfiles.map((artist) => (
                            <Link
                                to={`/group/${artist.groupName}?enter=${artist.enterName}`}
                                key={artist?.id}
                                className="profile-item"
                            >
                                <img src={artist?.artistGroupProfileImageUrl} alt={artist?.artistName} className="artist-profile-image"/>
                                <span className="profile-group-name">{artist?.groupName}</span>
                            </Link>
                        ))
                    ) : (
                        <li>아티스트 프로필이 없습니다.</li>
                    )}
                </ul>
            </div>
            {/*<Footer />*/}
        </div>
    );
};

export default MainPage;