import React, { useState, useEffect } from 'react';
import { createSchedule, createNotice, fetchSchedule, fetchNotices } from '../../service/Entertainer';
import Notices from './EnterNotice';
import ScheduleCalendar from './EnterSchedule'; // 실제 파일 이름에 맞게 수정
import Header from '../../components/Header'; // 헤더 컴포넌트 import
import '../../components/Header.css';
import './EntertainerPage.css';
import { useParams } from "react-router-dom";

const EnterPage = () => {
    const [notices, setNotices] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const { enterName } = useParams();

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
                setSchedules(data);
            } catch (error) {
                console.error('Error loading schedules:', error);
            }
        };
        loadNotices();
        loadSchedules();
    }, [enterName]);

    const handleCreateNotice = async (newNotice) => {
        try {
            const createdNotice = await createNotice(newNotice);
            setNotices(prevNotices => {
                const updatedNotice = [...prevNotices, createdNotice];
                return updatedNotice;
            });
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

    const handleCreateSchedule = async (newSchedule) => {
        try {
            const createdSchedule = await createSchedule(newSchedule);
            setSchedules(prevSchedules => {
                const updatedSchedules = [...prevSchedules, createdSchedule];
                return updatedSchedules;
            });
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="EnterPage">
            <Header /> {/* Header 컴포넌트 추가 */}
            <Notices notices={notices} onAddNotice={handleCreateNotice}/>
            <ScheduleCalendar
                schedules={schedules}
                onAddSchedule={handleCreateSchedule}
            />
        </div>
    );
};

export default EnterPage;