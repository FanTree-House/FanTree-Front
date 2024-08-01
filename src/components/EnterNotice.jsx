import React, { useState } from 'react';
import NoticeModal from './NoticeModal'; // Make sure to adjust the import path if necessary

function Notices({ notices, onAddNotice }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddNotice = (newNotice) => {
        onAddNotice(newNotice);
        closeModal();
    };

    if (!Array.isArray(notices)) {
        return <div>Error: Notices data is not an array</div>;
    }

    return (
        <section className="notices">
            <div className="notices-header">
                <h2>공지사항</h2>
                <button onClick={openModal} className="add-notice-btn">공지사항 작성</button>
            </div>
            <ul>
                {notices.length === 0 ? (
                    <li>No notices available</li>
                ) : (
                    notices.map(notice => (
                        <li key={notice.id}>{notice.title}</li>
                    ))
                )}
            </ul>
            <NoticeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleAddNotice}
            />
        </section>
    );
}

export default Notices;
