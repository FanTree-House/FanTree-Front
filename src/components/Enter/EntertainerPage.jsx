// src/components/Enter/EntertainerPage.jsx
import React, { useState, useEffect } from 'react';
import {  getEntertainment } from '../../service/EntertainmentService';
import { createSchedule, createNotice, fetchSchedule, fetchNotices} from '../../service/Entertainer';
import Notices from './EnterNotice';
import ScheduleCalendar from './EnterSchedule';
import Header from '../../components/Header';
import EnterHeader from './EnterHeader'; // 수정된 import
import '../../components/Header.css';
import './EntertainerPage.css';
import { useParams } from "react-router-dom";

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
                if (token) {
                    const data = await getEntertainment(token);
                    setEntertainment(data);
                }
            } catch (error) {
                console.error('Error fetching entertainment:', error);
            }
        };

        loadNotices();
        loadSchedules();
        fetchEntertainmentData(); // 엔터테인먼트 데이터 로드
    }, [enterName, token]);

    const handleCreateNotice = async (newNotice) => {
        try {
            const createdNotice = await createNotice({ ...newNotice, enterName });
            setNotices(prevNotices => [...prevNotices, createdNotice]);
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

    const handleCreateSchedule = async (newSchedule) => {
        try {
            const createdSchedule = await createSchedule({ ...newSchedule, enterName });
            setSchedules(prevSchedules => [...prevSchedules, createdSchedule]);
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="EnterPage">
            <Header />
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
