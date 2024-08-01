import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  sendEmailVerification, verifyAuthNumber,
  checkDuplicateNickname, checkDuplicateId, registerAdmin
} from "../services/SignupForm";
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    nickname: '',
    password: '',
    checkPassword: '',
    email: '',
    authNumber: '',
    admin:true,
    adminToken:'1np0t2ncesuuuud3rTaMeng5'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAdmin(formData);
      console.log('User registered:', response);
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ ...errors, submit: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    }
  };

  const handleCheckDuplicateId = async () => {
    try {
      const response = await checkDuplicateId(formData.id);
      console.log('ID check result:', response);
      // ID 중복 확인 결과 처리
    } catch (error) {
      console.error('ID check failed:', error);
      // 에러 메시지 표시
    }
  };

  const handleCheckDuplicateNickname = async () => {
    try {
      const response = await checkDuplicateNickname(formData.nickname);
      console.log('NickName check result:', response);
      // NickName 중복 확인 결과 처리
    } catch (error) {
      console.error('NickName check failed:', error);
      // 에러 메시지 표시
    }
  };

  const handleSendEmailVerification = async () => {
    try {
      const response = await sendEmailVerification(formData.id, formData.email);
      console.log('Email verification sent:', response);
      alert('이메일을 확인해주세요.')
    } catch (error) {
      console.error('Email verification failed:', error);
      // 에러 메시지 표시
    }
  };

  const handleVerifyAuthNumber = async () => {
    try {
      const response = await verifyAuthNumber(formData.id, formData.email, formData.authNumber);
      console.log('Auth number verification result:', response);
      // 인증 번호 확인 결과 처리
    } catch (error) {
      console.error('Auth number verification failed:', error);
      // 에러 메시지 표시
    }
  };


  return (
      <div className="signup-container">
        <h1>FanTree House</h1>
        <h2>회원 가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="이름 입력" required />
          </div>

          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} placeholder="아이디 입력 (문자, 숫자 포함 6-12자)" required />
            <button type="button" className="check-button" onClick={handleCheckDuplicateId}>중복 확인</button>
          </div>

          <div className="form-group">
            <label htmlFor="nickname">Nick Name</label>
            <input type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임 입력 (문자, 숫자 포함 8자-12자)" required />
            <button type="button" className="check-button" onClick={handleCheckDuplicateNickname}>중복 확인</button>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8-20자)" required />
          </div>

          <div className="form-group">
            <label htmlFor="checkPassword">Check Password</label>
            <input type="password" id="checkPassword" name="checkPassword" value={formData.checkPassword} onChange={handleChange} placeholder="비밀번호 재입력" required />
            {/*<button type="button" className="check-button">비밀번호 확인</button>*/}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="email-input">
              <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일 주소" required />
            </div>
            <button type="button" className="check-button" onClick={handleSendEmailVerification}>이메일 인증</button>
          </div>

          <div className="form-group">
            <label htmlFor="authNumber">Authentication number</label>
            <input type="text" id="authNumber" name="authNumber" value={formData.authNumber} onChange={handleChange} placeholder="인증 번호 입력" required />
            <button type="button" className="check-button" onClick={handleVerifyAuthNumber}>인증 확인</button>
          </div>

          <button type="submit" className="submit-button">가입하기</button>
        </form>
      </div>
  );
};

export default SignupForm;