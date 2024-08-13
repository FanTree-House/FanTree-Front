import React from 'react';
import ArtistFeedLikeModal from './ArtistFeedLikeModal';
import ArtistGroupModal from './ArtistGroupModal';
import CommunityFeedLikeModal from './CommunityFeedLikeModal';
import MyCommunityFeedModal from './MyCommunityFeedModal';
import './ButtonWithModal.css';

const ButtonWithModal = ({ content, onClose }) => {
    return (
        <>
            {content === '/artistFeedLike' && <ArtistFeedLikeModal onClose={onClose} />}
            {content === '/subscription' && <ArtistGroupModal onClose={onClose} />}
            {content === '/commuFeedLike' && <CommunityFeedLikeModal onClose={onClose} />}
            {content === '/communityFeed' && <MyCommunityFeedModal onClose={onClose} />}
            {content !== '/artistFeedLike' && content !== '/subscription' && content !== '/commuFeedLike' && content !== '/communityFeed' && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src={content}
                            title="Modal Content"
                            className="modal-iframe"
                        />
                        <button className="modal-close" onClick={onClose}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ButtonWithModal;
