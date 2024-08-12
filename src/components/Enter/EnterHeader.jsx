import React from 'react';
import './EntertainerPage.css'; // CSS 파일 임포트

function EnterHeader() {
    return (
        <header className="Enterheader">
            <div className="logo">
                <img src="/path-to-your-logo.png" alt="Entertainment Logo" />
            </div>
            <div className="company-intro">
                <h1>엔터테인먼트 회사명</h1>
                <p>회사에 대한 간단한 소개글</p>
            </div>
        </header>
    );
}

export default EnterHeader;