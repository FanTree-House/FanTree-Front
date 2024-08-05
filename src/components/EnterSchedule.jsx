import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useFloating, autoPlacement } from '@floating-ui/react';
import { fetchSchedule } from '../services/entertainer'; // 백엔드 통신 함수
import './CalendarCss.css'; // 스타일 시트

function ScheduleCalendar() {
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipCoords, setTooltipCoords] = useState({ top: 0, left: 0 });

    const { x, y, reference, floating, strategy } = useFloating({
        placement: 'top',
        middleware: [autoPlacement()],
    });

    useEffect(() => {
        // 컴포넌트가 마운트될 때 스케줄 데이터를 가져옴
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
                                        ref={reference}
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
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                        zIndex: 2000,
                    }}
                    className="tooltip"
                >
                    {tooltipContent}
                </div>
            )}
        </div>
    );
}

export default ScheduleCalendar;
