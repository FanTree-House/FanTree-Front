import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/src/CalendarCss.css';
import './CalendarCss.css'; // 스타일 시트 추가

function ScheduleCalendar({ schedules }) {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setSelectedDate(newDate);
    };

    const getSchedulesForDate = (date) => {
        const dateStr = date.toISOString().split('T')[0]; // yyyy-mm-dd 포맷
        return schedules.filter(schedule => schedule.date === dateStr);
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={handleDateChange}
                value={date}
                className="calendar"
            />
            <div className="schedule-details">
                <h3>Selected Date: {selectedDate.toDateString()}</h3>
                <ul>
                    {getSchedulesForDate(selectedDate).map((schedule, index) => (
                        <li key={index}>{schedule.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ScheduleCalendar;
