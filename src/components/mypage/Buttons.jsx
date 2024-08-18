import React, { useState } from 'react';
import './Buttons.css';
import ArtistGroupModal from './ArtistGroupModal';
import ArtistFeedLikeModal from './ArtistFeedLikeModal'
import MyCommunityFeedModal from './MyCommunityFeedModal';
import CommunityFeedLikeModal from "./CommunityFeedLikeModal";
import EnterFeedNoticeModal from "./EnterFeedNoticeModal";
import EnterFeedScheduleModal from "./EnterFeedScheduleModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBullhorn, faStar, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const Buttons = () => {
    const [modalContent, setModalContent] = useState(null);

    const buttons = [
        { text: '아티스트 게시글 좋아요', link: '/artistFeedLike', icon: faHeart },
        { text: '내 커뮤니티 게시글', link: '/communityFeed', icon: faComment },
        { text: '커뮤니티 게시글 좋아요', link: '/commuFeedLike', icon: faHeart },
        { text: '구독 그룹 관리', link: '/subscription', icon: faStar },
        { text: '구독 그룹 공지', link: '/notice', icon: faBullhorn },
        { text: '구독 그룹 스케줄', link: '/schedule', icon: faCalendar },
        // { text: '2', link: '/link2' },
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
                        {/* 아이콘이 있는 경우 아이콘을 먼저 렌더링 */}
                        {button.icon && (
                            <FontAwesomeIcon
                                icon={button.icon}
                                size="1x"
                                style={{ marginRight: '15px', color: "#184b83" }}
                                className="button-icon"
                            />
                        )}
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
