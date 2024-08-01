import React, { useState } from 'react';
import { createEntertainment } from '../service/entertainmentService';
import './EntertainmentCreatePage.css'; // 스타일 시트 임포트

const EntertainmentCreatePage = () => {
    const [enterNumber, setEnterNumber] = useState('');
    const [enterName, setEnterName] = useState('');
    const [enterLogo, setEnterLogo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enterData = {
            enterNumber: Number(enterNumber),
            enterName: enterName,
            enterLogo: enterLogo,
        };

        try {
            const result = await createEntertainment(enterData);
            console.log('Created Entertainment:', result);
        } catch (error) {
            console.error('Error during entertainment creation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label>사업자 번호:</label>
                <input
                    type="number"
                    value={enterNumber}
                    onChange={(e) => setEnterNumber(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <div className="form-group">
                <label>소속사 이름:</label>
                <input
                    type="text"
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <div className="form-group">
                <label>소속사 로고:</label>
                <input
                    type="file"
                    onChange={(e) => setEnterLogo(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <button type="submit" className="submit-button">엔터 생성</button>
        </form>
    );
};

export default EntertainmentCreatePage;