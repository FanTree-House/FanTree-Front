import React, { useState } from 'react';
import './NoticeModalCss.css'; // 스타일 시트 추가

function NoticeModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Notice'); // 기본값 설정
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotice = { title, category, description };
        onSubmit(newNotice);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>공지사항 작성</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">카테고리</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="Notice">Notice</option>
                            <option value="Schedule">Schedule</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">설명</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn">제출</button>
                </form>
            </div>
        </div>
    );
}

export default NoticeModal;
