import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntertainment } from '../service/EntertainmentService';
import Header from '../components/Header';
import './EntertainmentCreatePage.css';

const CreateEntertainment = () => {
    const [enterName, setEnterName] = useState('');
    const [enterNumber, setEnterNumber] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!enterName || !enterNumber || !file) {
            setMessage('모든 필드를 채워주세요.');
            return;
        }

        try {
            const token = window.localStorage.getItem('accessToken');
            if (!token) {
                setMessage('로그인이 필요합니다.');
                return;
            }

            const formData = new FormData();
            formData.append('enterName', enterName);
            formData.append('enterNumber', enterNumber);
            formData.append('file', file);

            const response = await createEntertainment(formData, token);
            if (response.ok) {
                setMessage('엔터테인먼트 생성 성공!');
                setEnterName('');
                setEnterNumber('');
                setFile(null);
                navigate('/artist-group-create');
            } else {
                setMessage('엔터테인먼트 생성 실패');
            }
        } catch (error) {
            console.error(error);
            setMessage('엔터테인먼트 생성 실패');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    return (
        <>
            <Header />
            <div className="container">
                <h2 className="centered-title">Create Entertainment</h2>
                <form onSubmit={handleSubmit}>
                    <label className="image-upload-wrapper centered">
                        {file ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Uploaded"
                                className="uploaded-image"
                            />
                        ) : (
                            <div className="image-placeholder">이미지를 넣어주세요</div>
                        )}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="image-input"
                            accept="image/*"
                        />
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={enterName}
                        onChange={(e) => setEnterName(e.target.value)}
                        className="input-field centered"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter Number"
                        value={enterNumber}
                        onChange={(e) => setEnterNumber(e.target.value)}
                        className="input-field centered"
                        required
                    />
                    <button type="submit" className="submit-button centered">Submit</button>
                </form>
                {message && <p className="message centered">{message}</p>}
            </div>
        </>
    );
};

export default CreateEntertainment;