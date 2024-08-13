import React, { useState, useEffect } from 'react';
import { createSchedule } from '../../service/Entertainer';
import {useParams} from "react-router-dom";

function AddScheduleModal({ selectedDate, onClose }) {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Schedule');
    const [message, setMessage] = useState('');
    const {enterName} = useParams()

    useEffect(() => {
        if (selectedDate) {
            setDate(selectedDate.toISOString().split('T')[0]);
        }
    }, [selectedDate]);

    const handleContentsChange = (e) => {
        setContents(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleScheduleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createSchedule({
                enterName,
                title,
                contents,
                date,
                category
            });
            if (typeof response === 'object') {
                setMessage(response.message || '일정이 추가되었습니다.');
            } else {
                setMessage('일정이 추가되었습니다.');
            }
            onClose(); // 스케줄 추가 후 모달 닫기
            window.location.reload();
        } catch (error) {
            setMessage(error.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <div id="schedulePopup" className="modal">
            <div className="modal-content">
                <h2>일정 추가 하기</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleScheduleTitle}
                            placeholder="제목을 입력하세요"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contents">일정</label>
                        <input
                            type="text"
                            id="contents"
                            name="contents"
                            value={contents}
                            onChange={handleContentsChange}
                            placeholder="일정을 입력해주세요"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">날짜</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={handleDateChange}
                            required
                        />
                    </div>
                    <button type="submit">추가하기</button>
                    <button type="button" onClick={onClose}>닫기</button>
                </form>
                {message && <p>{typeof message === 'string' ? message : '오류가 발생했습니다.'}</p>}
            </div>
        </div>
    );
}

export default AddScheduleModal;
