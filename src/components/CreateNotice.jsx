import React, { useState } from 'react';
import './NoticeModalCss.css';
import {createNotice} from "../services/entertainer";

function CreateNotice({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('Notice'); // 기본값 설정
    const [message, setMessage] = useState(''); // 기본값 설정

    const handleNoticeTitle = (e) => {setTitle(e.target.value);};
    const handleContents = (e) => {setContents(e.target.value);};
    const handleCategory = (e) => {setCategory(e.target.value);};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseMessage = await createNotice({
                title,
                contents
            });
            setMessage(responseMessage);
        } catch (error) {
            setMessage(error.message);
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
            </div>
        </div>
    );
}

export default CreateNotice;
