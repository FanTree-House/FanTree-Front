import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { fetchSchedule, createSchedule } from '../services/entertainer'; // 백엔드 통신 함수
import './CalendarCss.css'; // 스타일 시트
import AddScheduleModal from './CreateSchedule'; // 스케줄 생성 모달 컴포넌트

function ScheduleCalendar() {
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipCoords, setTooltipCoords] = useState({ top: 0, left: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadSchedules = async () => {
            const schedulesData = await fetchSchedule();
            setSchedules(schedulesData);
        };
        loadSchedules();
    }, []);

    const getSchedulesForDate = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return schedules.filter(schedule => schedule.date === dateStr);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            return getSchedulesForDate(date).length > 0 ? 'has-schedule' : '';
        }
    };

    const showTooltip = (date, event) => {
        const rect = event.target.getBoundingClientRect();
        setTooltipCoords({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
        setTooltipContent(renderTooltipContent(date));
    };

    const renderTooltipContent = (date) => {
        const schedulesForDate = getSchedulesForDate(date);
        if (schedulesForDate.length > 0) {
            return (
                <div>
                    {schedulesForDate.map((schedule, index) => (
                        <div key={index}>
                            <strong>{schedule.title}</strong>: {schedule.contents}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const handleAddSchedule = async (newSchedule) => {
        try {
            const createdSchedule = await createSchedule(newSchedule);
            setSchedules(prevSchedules => [...prevSchedules, createdSchedule]);
            setIsModalOpen(false); // 스케줄 추가 후 모달 닫기
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={tileClassName}
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const schedulesForDate = getSchedulesForDate(date);
                        return (
                            <div className="schedule-dot-container">
                                {schedulesForDate.length > 0 && (
                                    <span
                                        className="schedule-dot"
                                        onMouseEnter={(event) => showTooltip(date, event)}
                                        onMouseLeave={() => setTooltipContent(null)}
                                    />
                                )}
                            </div>
                        );
                    }
                    return null;
                }}
            />
            {tooltipContent && (
                <div
                    style={{
                        position: 'absolute',
                        top: tooltipCoords.top,
                        left: tooltipCoords.left,
                        zIndex: 2000,
                    }}
                    className="tooltip"
                >
                    {tooltipContent}
                </div>
            )}
            <button className="add-schedule-btn" onClick={() => setIsModalOpen(true)}>
                스케줄 생성하기
            </button>
            {isModalOpen && (
                <AddScheduleModal
                    selectedDate={selectedDate}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default ScheduleCalendar;
