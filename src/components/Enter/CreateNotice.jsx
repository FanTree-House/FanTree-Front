import React, { useState } from 'react';
import './NoticeModalCss.css';
import { createNotice } from '../../services/entertainer'; // API 호출 함수

function CreateNotice({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('Notice');
    const [message, setMessage] = useState('');

    const handleNoticeTitle = (e) => { setTitle(e.target.value); };
    const handleContents = (e) => { setContents(e.target.value); };
    const handleCategory = (e) => { setCategory(e.target.value); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newNotice = await createNotice({ title, contents, category });
            setMessage('공지사항이 등록되었습니다.');
            // 제출 후 모달을 닫고, 부모 컴포넌트의 공지사항 목록을 새로고침합니다.
            onSubmit(newNotice);
            onClose();
        } catch (error) {
            setMessage('공지사항 등록에 실패했습니다.');
        }
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
                            onChange={handleNoticeTitle}
                            placeholder="제목을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contents">공지사항</label>
                        <input
                            type="text"
                            id="contents"
                            value={contents}
                            onChange={handleContents}
                            placeholder="공지사항을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">카테고리</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategory}
                        >
                            <option value="Notice">Notice</option>
                            <option value="Schedule">Schedule</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">제출</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default CreateNotice;
