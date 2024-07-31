import React, { useEffect, useState } from 'react';

const GroupSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // 예제 데이터 사용
        const fetchSchedules = async () => {
            const response = { data: [
                    { groupName: "그룹 1", event: "스케줄 1" },
                    { groupName: "그룹 2", event: "스케줄 2" },
                    { groupName: "그룹 3", event: "스케줄 3" }
                ]}; // 예제 데이터
            setSchedules(response.data);
        };

        fetchSchedules();
    }, []);

    return (
        <div className="group-schedule">
            <h2>그룹 스케줄</h2>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={index}>
                        <strong>{schedule.groupName}</strong>: {schedule.event}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupSchedule;
