import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  sendEmailVerification, verifyAuthNumber,
  checkDuplicateNickname, checkDuplicateId, registerEnter, registerUser
} from "../service/SignupForm";
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
    entertainment:true,
    entertainmentToken:'AAABnyxRVklrnYxKz0aHgTBcXukezYGoc',
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await registerUser(formDataToSend);
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ ...errors, submit: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    }
  };

  const handleCheckDuplicateId = async () => {
    try {
      await checkDuplicateId(formData.id);
      alert('아이디가 사용 가능합니다.');
    } catch (error) {
      setErrors({ ...errors, id: '이미 사용 중인 아이디입니다.' });
    }
  };

  const handleCheckDuplicateNickname = async () => {
    try {
      await checkDuplicateNickname(formData.nickname);
      alert('닉네임이 사용 가능합니다.');
    } catch (error) {
      setErrors({ ...errors, nickname: '이미 사용 중인 닉네임입니다.' });
    }
  };

  const handleSendEmailVerification = async () => {
    try {
      await sendEmailVerification(formData.id, formData.email);
      alert('인증 번호가 이메일로 전송되었습니다.');
    } catch (error) {
      setErrors({ ...errors, email: '이메일 전송에 실패했습니다.' });
    }
  };

  const handleVerifyAuthNumber = async () => {
    try {
      await verifyAuthNumber(formData.id, formData.email, formData.authNumber);
      alert('인증이 완료되었습니다.');
    } catch (error) {
      setErrors({ ...errors, authNumber: '인증 번호가 올바르지 않습니다.' });
    }
  };

  return (
      <div className="signup-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>FanTree House</h1>
        </Link>
        <h2>회원 가입</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <div className="profile-image-container">
              <img
                  src={formData.file ? URL.createObjectURL(formData.file) : 'https://github.com/user-attachments/assets/0b652401-bde8-4ace-8754-1405cd57b3fa'}
                  alt="Profile"
                  className="profile-image"
                  onClick={() => document.getElementById('file').click()}
              />
              <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{display: 'none'}}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="이름 입력"
                   required/>
          </div>

          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange}
                   placeholder="아이디 입력 (문자, 숫자 포함 6-12자)" required/>
            <button type="button" className="check-button" onClick={handleCheckDuplicateId}>중복 확인</button>
          </div>

          <div className="form-group">
            <label htmlFor="nickname">Nick Name</label>
            <input type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange}
                   placeholder="닉네임 입력 (문자, 숫자 포함 8자-12자)" required/>
            <button type="button" className="check-button" onClick={handleCheckDuplicateNickname}>중복 확인</button>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                   placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8-20자)" required/>
          </div>

          <div className="form-group">
            <label htmlFor="checkPassword">Check Password</label>
            <input type="password" id="checkPassword" name="checkPassword" value={formData.checkPassword}
                   onChange={handleChange} placeholder="비밀번호 재입력" required/>
            {/*<button type="button" className="check-button">비밀번호 확인</button>*/}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="email-input">
              <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}
                     placeholder="이메일 주소" required/>
            </div>
            <button type="button" className="check-button" onClick={handleSendEmailVerification}>이메일 인증</button>
          </div>

          <div className="form-group">
            <label htmlFor="authNumber">Authentication number</label>
            <input type="text" id="authNumber" name="authNumber" value={formData.authNumber} onChange={handleChange}
                   placeholder="인증 번호 입력" required/>
            <button type="button" className="check-button" onClick={handleVerifyAuthNumber}>인증 확인</button>
          </div>

          <button type="submit" className="submit-button">가입하기</button>
        </form>
      </div>
  );
};

export default SignupForm;