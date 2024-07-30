import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        emailLocal: '',
        emailDomain: '',
        authenticationNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleIdCheck = () => {
        // ID 중복 확인 로직
    };

    const handleNicknameCheck = () => {
        // 닉네임 중복 확인 로직
    };

    const handlePasswordConfirm = () => {
        // 비밀번호 확인 로직
    };

    const handleEmailVerification = () => {
        // 이메일 인증 로직
    };

    const handleAuthenticationNumberCheck = () => {
        // 인증번호 확인 로직
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, id, nickname, password, emailLocal, emailDomain, authenticationNumber } = formData;
        const email = `${emailLocal}@${emailDomain}`;

        const requestBody = {
            name,
            id,
            nickname,
            password,
            email,
            authenticationNumber,
        };

        axios.post('http://localhost:8080/users/invite/entertainment', requestBody)
            .then(response => {
                // 성공 시 처리
                console.log(response.data);
                alert('회원가입이 완료되었습니다.');
            })
            .catch(error => {
                // 에러 시 처리
                console.error(error);
                alert('회원가입에 실패했습니다.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Image</label>
                <input type="file" name="image" />
            </div>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label>ID</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} />
                <button type="button" onClick={handleIdCheck}>중복 확인</button>
            </div>
            <div>
                <label>Nick Name</label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
                <button type="button" onClick={handleNicknameCheck}>중복 확인</button>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                <button type="button" onClick={handlePasswordConfirm}>비밀번호 확인</button>
            </div>
            <div>
                <label>Email</label>
                <input type="text" name="emailLocal" value={formData.emailLocal} onChange={handleChange} />
                <span>@</span>
                <input type="text" name="emailDomain" value={formData.emailDomain} onChange={handleChange} />
                <button type="button" onClick={handleEmailVerification}>이메일 인증</button>
            </div>
            <div>
                <label>Authentication Number</label>
                <input type="text" name="authenticationNumber" value={formData.authenticationNumber} onChange={handleChange} />
                <button type="button" onClick={handleAuthenticationNumberCheck}>인증 확인</button>
            </div>
            <div>
                <button type="submit">가입하기</button>
            </div>
        </form>
    );
};

export default SignUp;