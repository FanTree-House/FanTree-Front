// src/components/EnterHeader.js
import React, { useEffect, useState } from 'react';
import './EntertainerPage.css'; // CSS 파일 임포트

function EnterHeader({ Entertainment }) {
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        if (Entertainment?.file) {
            const url = URL.createObjectURL(Entertainment.file);
            setImageURL(url);
            return () => URL.revokeObjectURL(url); // Clean up URL object when component unmounts
        }
    }, [Entertainment?.file]);

    return (
        <header className="Enterheader">
            <div className="logo">
                <img src="/path-to-your-logo.png" alt="Entertainment Logo" />
            </div>
            <div className="company-intro">
                <h1>{Entertainment?.enterName || '엔터테인먼트 회사명'}</h1>
                {imageURL && (
                    <img src={imageURL} alt="Entertainment Logo" className="preview-image" />
                )}
            </div>
        </header>
    );
}

export default EnterHeader;
