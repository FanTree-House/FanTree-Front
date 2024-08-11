
import React from 'react';
import './ButtonWithModal.css';

const Modal = ({ content, onClose }) => {
    return (
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
    );
};

export default Modal;
