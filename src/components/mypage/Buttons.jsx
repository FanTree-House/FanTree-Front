
import React, { useState } from 'react';
import './Buttons.css';
import ButtonWithModal from './ButtonWithModal';
import { Link } from 'react-router-dom';

const Buttons = () => {
    const [modalContent, setModalContent] = useState(null);

    const buttons = [
        { text: '구독한 아티스트 그룹', link: '/subscription' },
        { text: '2', link: '/link2' },
        { text: '3', link: '/link3' },
        { text: '작성한 커뮤니티 게시글', link: '/link4' },
        { text: '아티스트 Feed 좋아요', link: '/link5' },
        { text: '커뮤니티 Feed 좋아요', link: '/link6' },
        { text: '7', link: '/link7' },
        { text: '8', link: '/link8' },
        { text: '9', link: '/link9' },
        { text: '10', link: '/link10' },
        { text: '11', link: '/link11' },
        { text: '12', link: '/link12' },
    ];

    const openModal = (link) => {
        setModalContent(link);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <div>
            <div className="buttons-container">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => openModal(button.link)}
                        className={`buttons-button pastel${index + 1}`}
                    >
                        {button.text}
                    </button>
                ))}
            </div>

            {modalContent && (
                <ButtonWithModal content={modalContent} onClose={closeModal} />
            )}
        </div>
    );
};

export default Buttons;
