// src/components/CreateEntertainment.js
import React, { useState } from 'react';
import { createEntertainment } from '../service/EntertainmentService';

const CreateEntertainment = () => {
    const [enterName, setEnterName] = useState('');
    const [enterNumber, setEnterNumber] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbnRlcjEiLCJhdXRoIjoiRU5URVJUQUlOTUVOVCIsInN0YXR1cyI6IkFDVElWRV9VU0VSIiwiZXhwIjoxNzIzMTAwMTE3LCJpYXQiOjE3MjMwOTgzMTd9.AoV9BSDmUrvoi1MjCULwfTE8LSJ8nCH3ZWFzg6xCj0M'; // 로그인 후 받은 실제 토큰

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옴
            if (!token) {
                setMessage('권한이 없습니다. 로그인이 필요합니다.');
                return;
            }

            const enterData = {
                enterName,
                enterNumber: parseInt(enterNumber),
                file
            };

            const response = await createEntertainment(enterData, token);
            setMessage('엔터테인먼트 계정이 성공적으로 생성되었습니다.');
            // 폼 초기화
            setEnterName('');
            setEnterNumber('');
            setFile(null);
        } catch (error) {
            setMessage('엔터테인먼트 계정 생성에 실패했습니다: ' + error.message);
        }
    };

    return (
        <div>
            <h2>엔터테인먼트 계정 생성</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="enterName">소속사 이름:</label>
                    <input
                        type="text"
                        id="enterName"
                        value={enterName}
                        onChange={(e) => setEnterName(e.target.value)}
                        required
                        pattern="^[a-zA-Z0-9]+$"
                        maxLength="20"
                    />
                </div>
                <div>
                    <label htmlFor="enterNumber">사업자 번호:</label>
                    <input
                        type="number"
                        id="enterNumber"
                        value={enterNumber}
                        onChange={(e) => setEnterNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">로고 이미지:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit">계정 생성</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateEntertainment;