import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthState, useAuthDispatch} from '../context/AuthContext'; // Context import
import {logout} from '../service/Logout'; // logout 함수 임포트
import './Header.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>


const Header = () => {
    const {user, userRole} = useAuthState(); // 권한과 사용자 정보 가져오기
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch({type: 'LOGOUT'});
            localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보만 제거
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

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
                        <button onClick={() => navigate('/create-enter')}>엔터 생성</button>
                        <button onClick={() => navigate('/create-artist-group')}>그룹 생성 </button>
                        <button onClick={() => navigate('/group/:groupName/enter/:enterName/notice')}>공지사항 작성</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                );
            case 'ARTIST':
                return (
                    <>
                        <button onClick={() => navigate(`/artistgroup/${user.groupName}/feed`)}>게시글 작성</button>
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
            <div className="search-container">
                <input type="text" className="search-input" placeholder="검색..."/>
                <button className="search-button">검색</button>
            </div>
            <div className="auth-buttons">
                {renderAuthButtons()}
            </div>
        </header>
    );
};

export default Header;