import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import {
  registerUser,
  sendEmailVerification,
  verifyAuthNumber,
  checkDuplicateNickname,
  checkDuplicateId,
  verifyPassword
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
    userRoleEnum: 'USER',
    file: null,
  });

  const [availableEmail,setAvailableEmail] = useState(false)
  const [availableId, setAvailableId] = useState(false)
  const [availableNickname, setAvailableNickname] = useState(false)
  const [availablePassword, setAvailavblePassowrd] = useState(false)

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (availableId && availableNickname && availableEmail && availablePassword) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'file') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append('defaultImageUrl', 'https://github.com/user-attachments/assets/0b652401-bde8-4ace-8754-1405cd57b3fa');
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      try {
        await registerUser(formDataToSend);
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ ...errors, submit: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
    }
    else if(!availableId) {
      alert('ID 중복확인을 해주세요.')
    }
    else if (!availableNickname){
      alert('닉네임 중복확인을 해주세요.')
    }
    else if(!availableEmail){
      alert('이메일 인증을 확인해주세요.')
    }
    else if (!availablePassword){
      alert('비밀번호가 일치하지 않습니다 확인해주세요.')
    }
  };

  const handleCheckDuplicateId = async () => {
    if (!formData.id.trim()) {
      alert("ID를 입력해 주세요");
      return;
    }

    const regex = /^[A-Za-z0-9]{6,12}$/;
    if (!regex.test(formData.id)) {
      alert('아이디는 문자와 숫자를 포함하여 6-12자여야 합니다.');
      return;
    }

    try {
      const data = await checkDuplicateId(formData.id);
      setAvailableId(!data.result)
      alert(data.message)
    } catch (error) {
      alert('서버에서 오류가 발생했습니다. 다시 시도해주세요');
    }
  };

  const handleCheckDuplicateNickname = async () => {
    if (!formData.nickname.trim()) {
      alert("닉네임을 입력해 주세요");
      return;
    }

    const regex = /^[A-Za-z0-9]{8,12}$/;
    if (!regex.test(formData.nickname)) {
      alert('닉네임은 문자와 숫자를 포함하여 8-12자여야 합니다.');
      return;
    }

    try {
      const data = await checkDuplicateNickname(formData.nickname);
      if (data.result) {
        alert('이미 사용 중인 닉네임입니다.');
        setAvailableNickname(false);
      } else {
        alert('사용 가능한 닉네임입니다.');
        setAvailableNickname(true);
      }
    } catch (error) {
      alert('서버에서 오류가 발생했습니다. 다시 시도해주세요');
    }
  };

  const handleCheckPassword = async () => {
    if (!formData.password.trim() || !formData.checkPassword.trim()) {
      alert("비밀번호와 확인 비밀번호를 입력해 주세요");
      return;
    }

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!regex.test(formData.password)) {
      alert('비밀번호는 문자, 숫자, 특수문자를 포함하여 8-20자여야 합니다.');
      return;
    }

    try {
      const data = await verifyPassword(formData.password, formData.checkPassword);
      setAvailavblePassowrd(data.result)
      alert(data.message)
    } catch (error) {
      alert('서버에서 오류가 발생했습니다. 다시 시도해주세요');
    }
  }

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
      const data = await verifyAuthNumber(formData.id, formData.email, formData.authNumber);
      setAvailableEmail(data.result)
      alert(data.message)
    } catch (error) {
      alert('서버에서 오류가 발생했습니다. 다시 시도해주세요');
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
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름 입력"
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디 입력 (문자, 숫자 포함 6-12자)"
                required
            />
            <button
                type="button"
                className="check-button"
                onClick={handleCheckDuplicateId}
            >
              중복 확인
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="nickname">Nick Name</label>
            <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="닉네임 입력 (문자, 숫자 포함 8자-12자)"
                required
            />
            <button
                type="button"
                className="check-button"
                onClick={handleCheckDuplicateNickname}
            >
              중복 확인
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8-20자)"
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkPassword">Check Password</label>
            <input type="password" id="checkPassword" name="checkPassword" value={formData.checkPassword}
                   onChange={handleChange} placeholder="비밀번호 재입력" required/>
            <button type="button" className="check-button" onClick={handleCheckPassword}>비밀번호 확인</button>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="email-input">
              <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일 주소"
                  required
              />
            </div>
            <button
                type="button"
                className="check-button"
                onClick={handleSendEmailVerification}
            >
              이메일 인증
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="authNumber">Authentication number</label>
            <input
                type="text"
                id="authNumber"
                name="authNumber"
                value={formData.authNumber}
                onChange={handleChange}
                placeholder="인증 번호 입력"
                required
            />
            <button
                type="button"
                className="check-button"
                onClick={handleVerifyAuthNumber}
            >
              인증 확인
            </button>
          </div>

          <button type="submit" className="submit-button">가입하기</button>
        </form>
      </div>
  );
};

export default SignupForm;