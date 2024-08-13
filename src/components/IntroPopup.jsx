// IntroPopup.js
import React from 'react';
import './IntroPopup.css';

const IntroPopup = ({ onClose, onHideForDay }) => {
    return (
        <div className="intro-popup-overlay">
            <div className="intro-popup">
                <h2>FanTreeHouse 서비스 소개</h2>
                <p>FanTreeHouse에 오신걸 환영합니다!</p>
                <p>저희 FanTreeHouse는 팬과 아티스트가 소통할 수 있는 팬트리 컴퍼니 팀의 포트폴리오 프로젝트 서비스입니다.</p>
                <p>해당 서비스에 있는 아티스트 서비스의 현실성을 부여하고자, 각 아티스트들이 올린 게시글을 토대로 만들어졌습니다.</p>
                <p>실제 아티스트와 소통한다고 생각하시면서 저희 서비스를 이용해보시면 더더욱 재미있게 저희 서비스를 즐기실 수 있어요!</p>
                <p>그럼, 이제 본격적으로 저희 서비스를 시작해볼까요~?</p>
                <div className="intro-popup-buttons">
                    <button onClick={onHideForDay}>오늘 하루 동안 안 보기</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default IntroPopup;