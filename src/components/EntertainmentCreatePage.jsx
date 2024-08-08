import React, { useState } from 'react';
import { createEntertainment } from '../service/EntertainmentService';

const CreateEntertainment = () => {
    const [enterName, setEnterName] = useState('');
    const [enterNumber, setEnterNumber] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

        if (!token) {
            setMessage('권한이 없습니다. 로그인이 필요합니다.');
            return;
        }

        try {
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
            console.error('엔터테인먼트 계정 생성 실패:', error);
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