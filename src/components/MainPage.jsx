import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistGroupService from '../service/ArtistGroupService';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
            setCurrentIndex((prevIndex) =>
                (prevIndex + 2) % artistGroups.length
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [artistGroups]);

    const getCurrentGroups = () => {
        const start = currentIndex;
        return artistGroups.slice(start, start + 2);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 2 + artistGroups.length) % artistGroups.length
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 2) % artistGroups.length
        );
    };

    return (
        <div className="main-page">
            <header className="header">
                <Header />
            </header>
            <div className="main-content">
                <div className="ranking-section">
                    <button className="nav-button prev-button" onClick={handlePrevClick}>&lt;</button>
                    <div className="ranking-grid">
                        {getCurrentGroups().map((group, index) => (
                            <Link
                                to={`/group/${group.groupName}`}
                                key={group?.id}
                                className="ranking-item"
                            >
                                <img src={group?.artistGroupProfileImageUrl} alt={group?.groupName}
                                     className="artist-image"/>
                                <div className="ranking-info">
                                    <span className="ranking-number">
                                        {String(Math.floor(currentIndex / 2) * 2 + index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="group-name">{group?.groupName}</h3>
                                    <span className="subscribe-count">구독자 수 : {group?.subscribeCount}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <button className="nav-button next-button" onClick={handleNextClick}>&gt;</button>
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
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;