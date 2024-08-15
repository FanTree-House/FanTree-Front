// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../service/LoginPage';
import { useAuthDispatch } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 아이디가 비어 있는지 체크
    if (!id) {
      alert('아이디를 입력해주세요.');
      return;
    }


    // 비밀번호가 비어 있는지 체크
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await login(id, password);
      if (!response.data || !response.data.userId) {
        alert('존재하지 않는 아이디입니다. 다시 시도해 주세요.');
        return;
      }

      const userData = {
        user: response.data.userId,
        userRole: response.data.userRole,
      };

      localStorage.setItem('user', JSON.stringify(userData));

      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
      navigate('/');
    } catch (error) {
      alert('비밀번호가 틀렸습니다. 다시 입력해 주세요.');
    }
  };

  const handleKakaoLogin = async () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=2b0e2842adcacfeb9731a68eb4b42048&redirect_uri=http://localhost:8080/user/kakao/callback&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
      <div className="login-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>FanTree House</h1>
        </Link>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
          />
          <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submitt-button">로그인</button>
        </form>
        <div className="social-login">
          <img
              src="https://github.com/user-attachments/assets/c91749aa-a7ce-4dac-acf0-21b5daf4bdaf"
              alt="카카오 로그인"
              className="kakao"
              onClick={handleKakaoLogin}
          />
        </div>
        <div className="links">
          <Link to="/signup">회원가입</Link> | <Link to="https://forms.gle/Uk1qPKahSLLB42m66">문의하기</Link> | <Link to="https://www.notion.so/teamsparta/ID-5a77ff084e224d408d2f1b00560f89c1">아이디 찾기</Link>
        </div>
      </div>
  );
}

export default LoginPage;