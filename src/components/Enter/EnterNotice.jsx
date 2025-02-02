import React, { useState, useEffect } from 'react';
import CreateNotice from './CreateNotice'; // 경로 확인
import NoticePopup from './NoticePopup'; // 경로 확인
import './EntertainerPage.css';
import { fetchNotices } from '../../service/Entertainer';
import {useParams} from "react-router-dom"; // 경로 확인

function Notices({ notices, onAddNotice, isVisible }) { // isVisible prop 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openPopup = (notice) => {
        setSelectedNotice(notice);
    };

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
                {isVisible && (
                    <button onClick={openModal} className="add-notice-btn">공지사항 작성</button>
                )}
            </div>
            <ul>
                {notices.length === 0 ? (
                    <li>No notices available</li>
                ) : (
                    notices.map(notice => (
                        <li key={`notice-item_${notice.id}`} className="notice-item" onClick={() => openPopup(notice)}>
                            <h3>{notice.title}</h3>
                            <p>{notice.contents}</p>
                        </li>
                    ))
                )}
            </ul>
            <CreateNotice
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleAddNotice}
            />
            <NoticePopup
                notice={selectedNotice}
                onClose={() => setSelectedNotice(null)}
            />
        </section>
    );
}

export default Notices;