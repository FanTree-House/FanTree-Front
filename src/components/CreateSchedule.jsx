import React, {useState} from 'react';
import {createSchedule} from '../services/entertainer';

function AddScheduleModal({selectedDate, onClose}) {
    const [contents, setContents] = useState('');
    const [date, setDate] = useState(selectedDate.toISOString().split('T')[0]); // yyyy-mm-dd 형식
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Schedule'); // 기본값 설정
    const [message, setMessage] = useState('');


    const handleContentsChange = (e) => {
        setContents(e.target.value);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleScheduleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseMessage = await createSchedule({
                title,
                contents,
                date
            });
            setMessage(responseMessage);
        } catch (error) {
            setMessage(error.message);
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
                            value={category} onChange={handleCategory}>
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
                        />
                    </div>
                    <label htmlFor="contents">일정:</label>
                    <input
                        type="text"
                        id="contents"
                        name="contents"
                        value={contents}
                        onChange={handleContentsChange}
                        placeholder="일정을 입력해주세요"
                    />
                    <label htmlFor="date">날짜:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                    <button type="submit">추가하기</button>
                    <button type="button" onClick={onClose}>닫기</button>
                </form>
            </div>
        </div>
    );
}

export default AddScheduleModal;
