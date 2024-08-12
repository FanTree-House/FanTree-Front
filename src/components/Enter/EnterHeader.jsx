// src/components/Enter/EnterHeader.jsx
import React from 'react';
import './EntertainerPage.css';

function EnterHeader({ Entertainment }) {
    // 로딩 중 상태 처리
    if (!Entertainment) {
        return <div>Loading...</div>;
    }

    // Entertainment 객체에서 file이 있는지 확인
    console.log('Entertainment file:', Entertainment.file);

    return (
        <header className="Enterheader">
            <div className="logo">
                {Entertainment.file && (
                    <img src={Entertainment.file} alt="Logo" className="preview-image" />)}
            </div>
            <div className="company-intro">
                <h1>{Entertainment.enterName || '엔터테인먼트 회사명'}</h1>
            </div>
        </header>
    );
}

export default EnterHeader;
