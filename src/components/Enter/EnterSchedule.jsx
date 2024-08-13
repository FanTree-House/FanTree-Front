import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import {fetchSchedule, createSchedule} from '../../service/Entertainer'; // 백엔드 통신 함수
import './CalendarCss.css'; // 스타일 시트
import AddScheduleModal from './CreateSchedule'; // 스케줄 생성 모달 컴포넌트

function ScheduleCalendar({ schedules: receivedSchedules, onAddSchedule, isVisible }) { // isVisible prop 추가
    const [schedules, setSchedules] = useState(receivedSchedules);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipCoords, setTooltipCoords] = useState({top: 0, left: 0});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isTooltipShown, setIsTooltipShown] = useState(false);

    // schedules가 변경되면 state를 업데이트합니다.
    useEffect(() => {
        setSchedules(receivedSchedules);
    }, [receivedSchedules]);
    const getSchedulesForDate = (date) => {

        const kst = 9 * 60 * 60 * 1000;
        const utcTime = date.getTime();
        const kstTime = utcTime + kst;
        const kstDate = new Date(kstTime);
        const kstString = kstDate.toISOString().replace('Z', '+09:00');
        const slicedKstString = kstString.slice(0, 10);

        return schedules.filter(schedule => schedule.date === slicedKstString);
    };

    const tileClassName = ({date, view}) => {
        if (view === 'month') {
            return getSchedulesForDate(date).length > 0 ? 'has-schedule' : '';
        }
    };

    const showTooltip = (date, event) => {
        const rect = event.target.getBoundingClientRect();
        setTooltipCoords({top: rect.top + window.scrollY, left: rect.left + window.scrollX});
        setTooltipContent(renderTooltipContent(date));
    };

    const renderTooltipContent = (date) => {
        const schedulesForDate = getSchedulesForDate(date);
        if (schedulesForDate.length > 0) {
            return (
                <div>
                    {schedulesForDate.map((schedule, index) => (
                        <div key={index} style={
                            {
                                display : 'flex',
                                flexDirection : 'column'
                            }
                        }>
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
            await onAddSchedule(newSchedule); // 부모에서 전달받은 함수를 호출
            setIsModalOpen(false); // 스케줄 추가 후 모달 닫기
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={setSelectedDate}
                onMouseOver={() => {
                    alert("동작!")
                }}
                value={selectedDate}
                tileClassName={tileClassName}
                tileContent={({date, view}) => {
                    if (view === 'month') {
                        const schedulesForDate = getSchedulesForDate(date);
                        return (
                            <div className="schedule-dot-container"
                                 onMouseOver={(event) => {
                                     setIsTooltipShown(true);
                                     showTooltip(date, event)
                                     console.log("isTooltipShown = " + isTooltipShown)
                                 }}
                                 onMouseLeave={() => {
                                     setIsTooltipShown(false);
                                     setTooltipContent(null)
                                 }}
                            >
                                {schedulesForDate.length > 0 && (
                                    <span
                                        className="schedule-dot"
                                    />
                                )}
                            </div>
                        );
                    }
                    return null;
                }}
            />
            {
                isTooltipShown && tooltipContent && (<div style={{
                    position: 'absolute',
                    top: "150px",
                    left: "200px",
                    height: "150px",
                    width: "150px",
                    fontSize: "15px",
                    zIndex: 2000,
                    background: 'white',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '4px'
                }}>{tooltipContent}</div>)
            }
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
            {isVisible && (
                <button className="add-schedule-btn" onClick={() => setIsModalOpen(true)}>
                스케줄 생성하기
            </button>
            )}
            {isModalOpen && (
                <AddScheduleModal
                    selectedDate={selectedDate}
                    onClose={() => setIsModalOpen(false)}
                    onAddSchedule={handleAddSchedule} // 모달에서 스케줄을 추가할 수 있도록 전달
                />
            )}
        </div>
    );
}

export default ScheduleCalendar;
