import React, { useState, useEffect } from 'react';
import { createSchedule, createNotice, fetchSchedule, fetchNotices } from '../../service/Entertainer';
import Notices from './EnterNotice';
import ScheduleCalendar from './EnterSchedule'; // 실제 파일 이름에 맞게 수정
import EnterHeader from './EnterHeader';
import './EntertainerPage.css';

const EnterPage = () => {
    const [notices, setNotices] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const enterName = ""; // 그룹네임 하이브지정

    useEffect(() => {
        const loadNotices = async () => {
            try {
                const data = await fetchNotices(enterName);
                setNotices(data);
            } catch (error) {
                console.error('Error loading notices:', error);
            }
        };

        const loadSchedules = async () => {
            try {
                const data = await fetchSchedule(enterName);
                console.log(JSON.stringify(data));
                setSchedules(data);
            } catch (error) {
                console.error('Error loading schedules:', error);
            }
        };

        loadNotices();
        loadSchedules();
        console.log("구해줘")
    }, [enterName]);

    const handleCreateNotice = async (newNotice) => {
        try {
            const createdNotice = await createNotice(newNotice);
            setNotices(prevNotices => [...prevNotices, createdNotice]);
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

    const handleCreateSchedule = async (newSchedule) => {
        try {
            const createdSchedule = await createSchedule(newSchedule);
            console.log("Created schedule:", createdSchedule);  // 추가된 로그
            setSchedules(prevSchedules => {
                const updatedSchedules = [...prevSchedules, createdSchedule];
                console.log("Updated schedules:", updatedSchedules);  // 추가된 로그
                return updatedSchedules;
            });
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="EnterPage">
            <header className="header">
                <h1 className="header-title">FanTree House</h1> {/* 클래스 추가 */}
            </header>
            <EnterHeader/>
            <Notices notices={notices} onAddNotice={handleCreateNotice}/>
            <ScheduleCalendar
                schedules={schedules}
                onAddSchedule={handleCreateSchedule}
            />
        </div>
    );
};

export default EnterPage;