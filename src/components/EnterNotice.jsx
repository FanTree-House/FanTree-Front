import React, { useState, useEffect } from 'react';
import CreateNotice from './CreateNotice'; // 경로 확인
import NoticePopup from './NoticePopup'; // 경로 확인
import './EntertainerPage.css';
import { fetchNotices } from '../services/entertainer';
import entertainerPage from "./EntertainerPage"; // 경로 확인

function Notices() {
    const [notices, setNotices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = async () => {
        try {
            const noticesData = await fetchNotices();
            setNotices(noticesData);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openPopup = (notice) => {
        console.log('Selected notice:', notice); // 선택된 데이터 확인
        setSelectedNotice(notice);
    };

    const handleAddNotice = (newNotice) => {
        setNotices(prevNotices => [...prevNotices, newNotice]);
        closeModal(); // 모달을 닫습니다
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
                        <li key={notice.id} className="notice-item" onClick={() => openPopup(notice)}>
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
