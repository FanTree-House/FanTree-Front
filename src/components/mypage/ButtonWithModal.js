// src/ButtonWithModal.jsx
import React from 'react';
import ArtistGroupModal from './ArtistGroupModal';
import './ButtonWithModal.css';

const ButtonWithModal = ({ content, onClose }) => {
    return (
        <>
            {content === '/subscription' && <ArtistGroupModal onClose={onClose} />}
            {content !== '/subscription' && (
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
