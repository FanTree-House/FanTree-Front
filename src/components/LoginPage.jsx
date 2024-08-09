// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, kakaoLogin } from '../service/LoginPage';
import { useAuthDispatch } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(id, password);
      console.log('로그인 성공:', response);

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
      setError(error.message || '로그인에 실패했습니다.');
    }
  };



  const handleKakaoLogin = async () => {
    // 카카오 인증 URL을 브라우저에서 열어 인증 처리
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=2b0e2842adcacfeb9731a68eb4b42048&redirect_uri=http://localhost:8080/user/kakao/callback&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
      <div className="login-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>FanTree House</h1>
        </Link>
        {error && <p className="error-message">{error}</p>}
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
          <label>
            <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
            />
            로그인 상태 유지
          </label>
          <button type="submit" className="submit-button">로그인</button>
        </form>
        <div className="social-login">
          <button onClick={handleKakaoLogin} className="kakao">K</button>
        </div>
        <div className="links">
          <Link to="/signup">회원가입</Link> | <a href="#">문의하기</a> | <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
        </div>
      </div>
  );
}

export default LoginPage;