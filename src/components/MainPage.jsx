import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistGroupService from '../service/ArtistGroupService';
import Header from '../components/Header'; // 헤더 컴포넌트 임포트
import { useAuthDispatch } from '../context/AuthContext';
import './MainPage.css';

const MainPage = () => {

    const dispatch = useAuthDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({
                type: 'LOGIN',
                payload: user,
            });
        }
    }, [dispatch]);


    const [artistGroups, setArtistGroups] = useState([]);
    const [artistProfiles, setArtistProfiles] = useState([]);

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getArtistGroups('', 0, 15);
                setArtistGroups(data);
            } catch (error) {
                console.error('Error fetching artist groups:', error);
            }
        };

        const fetchAllArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getAllArtistGroups();
                setArtistProfiles(data);
            } catch (error) {
                console.error('Error fetching all artist groups:', error);
            }
        };

        fetchArtistGroups();
        fetchAllArtistGroups();
    }, []);

    return (
        <div className="main-page">
            <Header /> {/* 헤더 컴포넌트 추가 */}
            <div className="ranking-section">
                <h2>아티스트 그룹 랭킹</h2>
                <ul className="ranking-list">
                    <li key={artistGroups[0]?.id} className="ranking-item first">
                        <span className="ranking-position">1위</span>
                        <img src={artistGroups[0]?.artistGroupProfileImageUrl} alt={artistGroups[0]?.groupName}
                             className="artist-image"/>
                        <span className="group-name">{artistGroups[0]?.groupName}</span>
                    </li>
                    {artistGroups.slice(1, 15).map((group, index) => (
                        <li key={group?.id} className="ranking-item">
                            <span className="ranking-position">{index + 2}위</span>
                            <img src={group?.artistGroupProfileImageUrl} alt={group?.groupName} className="artist-image"/>
                            <span className="group-name">{group?.groupName}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h2>아티스트 프로필</h2>
                <ul className="profile-list">
                    {artistProfiles.length > 0 ? (
                        artistProfiles.map((artist) => (
                            <Link
                                to={`/group/${artist.groupName}`}
                                key={artist?.id}
                                className="profile-item"
                            >
                                <img src={artist?.artistGroupProfileImageUrl} alt={artist?.artistName}
                                     className="artist-profile-image"/>
                                <span className="profile-group-name">{artist?.groupName}</span>
                            </Link>
                        ))
                    ) : (
                        <li>아티스트 프로필이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;