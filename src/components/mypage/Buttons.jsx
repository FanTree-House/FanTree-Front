
import React, { useState } from 'react';
import './Buttons.css';
import ButtonWithModal from './ButtonWithModal';
import { Link } from 'react-router-dom';
import ArtistGroupModal from './ArtistGroupModal'; // Import the ArtistGroupModal component
import ArtistFeedLikeModal from './ArtistFeedLikeModal'

const Buttons = () => {
    const [modalContent, setModalContent] = useState(null);

    const buttons = [
        { text: '그룹 구독 관리', link: '/subscription' },
        { text: '구독 그룹(아티스트) 게시글', link: '/link2' },
        { text: '아티스트 게시글 좋아요', link: '/artistFeedLike' },
        { text: '내 커뮤니티 게시글', link: '/link4' },
        { text: '5', link: '/link5' },
        { text: '커뮤니티 게시글 좋아요', link: '/link6' },
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

    const renderModal = () => {
        switch (modalContent) {
            case '/subscription':
                return <ArtistGroupModal onClose={closeModal} />;
            case '/artistFeedLike':
                // 예시로 postId를 123으로 설정. 실제 구현 시에는 실제 postId를 동적으로 전달해야 합니다.
                return <ArtistFeedLikeModal postId={123} onClose={closeModal} />;
            default:
                return null;
        }
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
                <div>
                    {renderModal()}
                </div>
            )}
        </div>
    );
};

export default Buttons;
