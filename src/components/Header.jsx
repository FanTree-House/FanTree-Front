import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../context/AuthContext';
import { logout } from '../service/Logout';
import { getArtistGroupName } from '../service/ArtistFeedService';
import { searchArtistGroup } from '../service/SearchService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
    const { user, userRole } = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [artistGroupName, setArtistGroupName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            try {
                const results = await searchArtistGroup(searchTerm);
                setSearchResults(results.content);
                navigate('/search-results', { state: { results: results.content } });
            } catch (error) {
                console.error('Search failed:', error);
            }
        }
    };


    const fetchArtistGroupName = async () => {
        try {
            const groupName = await getArtistGroupName();
            setArtistGroupName(groupName);
        } catch (error) {
            console.error('Failed to fetch artist group name:', error);
        }
    };

    useEffect(() => {
        if (userRole === 'ARTIST') {
            fetchArtistGroupName();
        }
    }, [userRole]);

    const renderAuthButtons = () => {
        if (!user) {
            return (
                <>
                    <button className="login-button" onClick={() => navigate('/login')}>로그인</button>
                    <button className="signup-button" onClick={() => navigate('/signup')}>회원가입</button>
                </>
            );
        }

        switch (userRole) {
            case 'USER':
                return (
                    <>
                        <button onClick={() => navigate('/mypage')}>마이 페이지</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                );
            case 'ADMIN':
                return (
                    <>
                        <button onClick={() => navigate('/admin')}>관리자 버튼</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                );
            case 'ENTERTAINMENT':
                return (
                    <>
                        <div className="dropdown">
                            <button className="btn btn-custom dropdown-toggle" type="button" id="entertainmentDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                엔터 생성
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="entertainmentDropdown">
                                <li><a className="dropdown-item" href="#" onClick={() => navigate('/create-enter')}>엔터 생성</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => navigate('/editenter')}>엔터 조회</a></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-custom dropdown-toggle" type="button" id="groupDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                그룹
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="groupDropdown">
                                <li><a className="dropdown-item" href="#"
                                       onClick={() => navigate('/create-artist-group')}>그룹 생성</a></li>
                                <li><a className="dropdown-item" href="#"
                                       onClick={() => navigate('/editgroup')}>그룹 조회</a></li>
                                {/*<button onClick={() => navigate('/create-enter')}>엔터 생성</button>*/}
                                {/*<button onClick={() => navigate('/create-artist-group')}>그룹 생성 </button>*/}
                                {/*<button onClick={() => navigate('/group/:groupName/enter/:enterName/notice')}>공지사항 작성</button>*/}
                                {/*<button onClick={handleLogout}>로그아웃</button>*/}
                            </ul>
                        </div>
                        <button className="btn btn-custom" onClick={() => navigate('/group/:groupName/enter/:enterName')}>공지사항 작성</button>
                        <button className="btn btn-custom" onClick={handleLogout}>로그아웃</button>
                    </>
                );
            case 'ARTIST':
                return (
                    <>
                        <button onClick={() => navigate(`/artistgroup/${artistGroupName}/feed`)}>게시글 작성</button>
                        <button onClick={() => navigate(`/group/${artistGroupName}/myfeeds`)}>게시글 조회</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <header className="header">
            <Link to="/" className="logo">FanTree House</Link>
            <nav className="navbar navbar-light">
                <div className="search-container">
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="아티스트 그룹 검색"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-custom" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div className="auth-buttons">
                {renderAuthButtons()}
            </div>
        </header>
    );
};

export default Header;