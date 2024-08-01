import React, { useState, useEffect } from 'react';
import { fetchSchedule, createNotice } from '../services/entertainer';
import Notices from './EnterNotice';
import EnterSchedule from './EnterSchedule';
import EnterHeader from "./EnterHeader";

function App() {
    const [notices, setNotices] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const loadNotices = async () => {
            try {
                const data = await fetchSchedule();
                if (Array.isArray(data)) {
                    setSchedules(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setSchedules([]); // 비정상적인 데이터 형식 처리
                }
            } catch (error) {
                console.error('Error loading schedules:', error);
                setSchedules([]); // 오류 발생 시 빈 배열 설정
            }
        };

        loadNotices();
    }, []);


    const handleAddNotice = async (newNotice) => {
        try {
            const createdNotice = await createNotice(newNotice);
            setNotices(prevNotices => [...prevNotices, createdNotice]);
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

return (
    <div className="App">
        <EnterHeader />
        <Notices notices={notices} onAddNotice={handleAddNotice} />
        <EnterSchedule schedules={schedules} />
    </div>
);
}
export default App;
