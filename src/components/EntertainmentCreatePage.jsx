// 엔터 생성 페이지

import React, { useState } from 'react';
import { createEntertainment } from '../services/entertainmentService';

const EntertainmentCreatePage = () => {
    const [enterNumber, setEnterNumber] = useState('');
    const [enterName, setEnterName] = useState('');
    const [enterLogo, setEnterLogo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enterData = {
            enterNumber: Number(enterNumber), // 숫자로 변환
            enterName: enterName,
            enterLogo: enterLogo,
        };

        try {
            const result = await createEntertainment(enterData);
            console.log('Created Entertainment:', result);
            // 성공 메시지나 페이지 리다이렉션 등의 추가 작업
        } catch (error) {
            console.error('Error during entertainment creation:', error);
            // 에러 처리
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>사업자 번호:</label>
                <input
                    type="number"
                    value={enterNumber}
                    onChange={(e) => setEnterNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>소속사 이름:</label>
                <input
                    type="text"
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>소속사 로고:</label>
                <input
                    type="file" // 또는 파일 업로드를 원하시면 type="file"로 변경
                    value={enterLogo}
                    onChange={(e) => setEnterLogo(e.target.value)}
                    required
                />
            </div>
            <button type="submit">엔터 생성</button>
        </form>
    );
};

export default EntertainmentCreatePage;