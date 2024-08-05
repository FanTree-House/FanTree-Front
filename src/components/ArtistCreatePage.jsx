import React, { useState } from 'react';
import { createArtist } from '../services/artistCreate'; // API 모듈을 import 합니다.
import './ArtistCreatePageCss.css'; // CSS 파일을 import 합니다.

const ArtistCreatePage = () => {
    const [artistName, setArtistName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');


    const handleArtistNameChange = (e) => {
        setArtistName(e.target.value);
    };

    const handleIntroductionChange = (e) => {
        setIntroduction(e.target.value)
    }

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("artistName", artistName);
        formData.append("introduction", introduction )
        formData.append('file', photo);

        try {
            const responseMessage = await createArtist(formData);
            setMessage(responseMessage);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="register-container">
            <h1>Artist 계정 생성</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>아티스트 계정 이름 : </label>
                    <input
                        type="text"
                        value={artistName}
                        onChange={handleArtistNameChange}
                    />
                </div>
                <div className="form-group">
                    <label>아티스트 소개 : </label>
                    <input
                        type="text"
                        value={introduction}
                        onChange={handleIntroductionChange}
                    />
                </div>
                <div className="form-group">
                    <label className="upload-icon">
                        <input
                            type="file"
                            onChange={handlePhotoChange}/>
                        <img src="/upload_icon.png" alt="Upload Icon"/>
                    </label>
                </div>
                <button type="submit">아티스트 계정생성</button>
            </form>
        </div>
    );
};

export default ArtistCreatePage;
