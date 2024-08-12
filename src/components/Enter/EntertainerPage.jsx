import React, { useState, useEffect } from 'react';
import { createSchedule, createNotice, fetchSchedule, fetchNotices } from '../../service/Entertainer';
import EnterHeader from './EnterHeader'; // 엔터헤더 컴포넌트 import
import Notices from './EnterNotice';
import ScheduleCalendar from './EnterSchedule'; // 실제 파일 이름에 맞게 수정
import Header from '../../components/Header'; // 헤더 컴포넌트 import
import '../../components/Header.css';
import './EntertainerPage.css';
import { useParams } from "react-router-dom";
import { getEntertainment } from '../../service/entertainmentService'; // 엔터테인먼트 서비스 import

const EnterPage = () => {
    const [notices, setNotices] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [entertainment, setEntertainment] = useState(null);
    const { enterName } = useParams();
    const token = window.localStorage.getItem('accessToken');

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

        const fetchEntertainmentData = async () => {
            try {
                const data = await getEntertainment(token);
                setEntertainment(data);
            } catch (error) {
                console.error('Error fetching entertainment:', error);
            }
        };

        loadNotices();
        loadSchedules();
        if (token) {
            fetchEntertainmentData();
        }
    }, [enterName, token]);

    const handleCreateNotice = async (newNotice) => {
        try {
            const createdNotice = await createNotice({ enterName, ...newNotice });
            setNotices(prevNotices => [...prevNotices, createdNotice]);
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

    const handleCreateSchedule = async (newSchedule) => {
        try {
            const createdSchedule = await createSchedule({ enterName, ...newSchedule });
            setSchedules(prevSchedules => [...prevSchedules, createdSchedule]);
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="EnterPage">
            <Header /> {/* Header 컴포넌트 추가 */}
            <EnterHeader Entertainment={entertainment} />
            <Notices notices={notices} onAddNotice={handleCreateNotice} />
            <ScheduleCalendar
                schedules={schedules}
                onAddSchedule={handleCreateSchedule}
            />
        </div>
    );
};

export default EnterPage;
