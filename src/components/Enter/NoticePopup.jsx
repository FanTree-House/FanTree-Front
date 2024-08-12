import React from 'react';
import './NoticePopupCss.css'; // 팝업창 스타일 시트

function NoticePopup({ notice, onClose }) {
    if (!notice) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>×</button>
                <h2>{notice.title}</h2>
                <p>{notice.contents}</p>
            </div>
        </div>
    );
}

export default NoticePopup;
