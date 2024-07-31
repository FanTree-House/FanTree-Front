import React, { useState } from 'react';
import { createArtist } from '../services/artistCreate'; // API 모듈을 import 합니다.
import './ArtistCreatePageCss.css'; // CSS 파일을 import 합니다.

const ArtistCreatePage = () => {
    const [artistName, setArtistName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseMessage = await createArtist(artistName, photo);
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
                    <label>Artist Name:</label>
                    <input
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="upload-icon">
                        <input
                            type="file"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                        />
                        <img src="/upload_icon.png" alt="Upload Icon" />
                    </label>
                </div>
                <button type="submit">Create Artist</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ArtistCreatePage;
