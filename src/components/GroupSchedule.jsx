import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroupSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // 예제 데이터 사용
        const fetchSchedules = async () => {
            const response = await axios.get('/api/schedules'); // 실제 API 엔드포인트로 변경
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
