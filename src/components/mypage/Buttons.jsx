import React, { useState } from 'react';
import './Buttons.css';
import ButtonWithModal from './ButtonWithModal';
import { Link } from 'react-router-dom';
import ArtistGroupModal from './ArtistGroupModal';
import ArtistFeedLikeModal from './ArtistFeedLikeModal'
import MyCommunityFeedModal from './MyCommunityFeedModal';
import CommunityFeedLikeModal from "./CommunityFeedLikeModal";
import EnterFeedNoticeModal from "./EnterFeedNoticeModal";
import EnterFeedScheduleModal from "./EnterFeedScheduleModal";
import apiClient from "../../service/apiClient";

const Buttons = () => {
    const [modalContent, setModalContent] = useState(null);

    const buttons = [
        { text: '아티스트 게시글 좋아요', link: '/artistFeedLike' },
        { text: '내 커뮤니티 게시글', link: '/communityFeed' },
        { text: '커뮤니티 게시글 좋아요', link: '/commuFeedLike' },
        { text: '그룹 구독 관리', link: '/subscription' },
        { text: '구독 그룹 공지', link: '/notice' },
        { text: '구독 그룹 스케줄', link: '/schedule' },
        // { text: '2', link: '/link2' },
        // { text: '5', link: '/link5' },
        // { text: '구독 그룹(아티스트) 게시글', link: '/link6' },
        // { text: '', link: '/' },
        // { text: '10', link: '/link10' },
        // { text: '11', link: '/link11' },
    ];

    const openModal = (link) => {
        setModalContent(link);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    const renderModal = () => {
        switch (modalContent) {
            case '/artistFeedLike':
                return <ArtistFeedLikeModal postId={123} onClose={closeModal} />;// 예시로 postId를 123으로 설정. 실제 구현 시에는 실제 postId를 동적으로 전달해야 합니다.
            case '/communityFeed':
                return <MyCommunityFeedModal onClose={closeModal} />;
            case '/commuFeedLike':
                return <CommunityFeedLikeModal postId={100} onClose={closeModal} />;
            case '/subscription':
                return <ArtistGroupModal onClose={closeModal} />;
            case '/notice':
                return <EnterFeedNoticeModal postId={33} onClose={closeModal} />
            case '/schedule':
                return <EnterFeedScheduleModal postId={55} onClose={closeModal} />
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
