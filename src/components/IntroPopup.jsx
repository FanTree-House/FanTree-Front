// IntroPopup.js
import React from 'react';
import './IntroPopup.css';

const IntroPopup = ({ onClose, onHideForDay }) => {
    return (
        <div className="intro-popup-overlay">
            <div className="intro-popup">
                <h2>FanTreeHouse 서비스 소개</h2>
                <p>🎉 FanTreeHouse에 오신걸 환영합니다! 🎉</p>
                <p>FanTreeHouse는 팬과 아티스트가 소통할 수 있는 플랫폼으로, <br/>
                    팬트리 컴퍼니 팀의 프로젝트 서비스입니다.</p>
                <p>저희 서비스는 각 아티스트가 올린 게시글을 바탕으로 제작하여, <br/>
                    아티스트 관련 서비스의 현실성을 높이기위해 노력했습니다.</p>
                <p>실제 아티스트와 소통한다고 생각하며 서비스를 이용하시면<br/>
                    더욱 재미있게 즐기실 수 있습니다!</p>
                    <p>그럼, 이제 본격적으로 저희 서비스를 시작해볼까요? 😊</p>
                    <p className="survey-mention">
                        ps. 서비스 이용 후 하단의 설문폼을 작성해 주시면,<br/>
                        추첨을 통해 선물을 드립니다. 많은 참여 부탁드립니다!
                    </p>
                    <div className="intro-popup-buttons">
                        <button onClick={onHideForDay}>오늘 하루 동안 안 보기</button>
                        <button onClick={onClose}>닫기</button>
                    </div>
            </div>
        </div>
    );
};

export default IntroPopup;