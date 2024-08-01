import React, {useState, useEffect} from 'react';
import {fetchSchedule, createNotice, fetchNotices} from '../services/entertainer';
import Notices from './EnterNotice';
import EnterSchedule from './EnterSchedule';
import EnterHeader from './EnterHeader'; // 경로가 정확한지 확인하세요
import './EntertainerPage.css';

const EnterPage = () => {
    const [notices, setNotices] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const enterName = ""; //그룹네임 하이브지정


    useEffect(() => {
        const loadNotices = async () => {
            try {
                const data = await fetchNotices(enterName);
                setNotices(data);
            } catch (error) {
                console.error('Error loading notices:', error);
            }
        };


        const loadSchedules = async (enterName) => {
            try {
                const data = await fetchSchedule(enterName); // enterName을 전달
                setSchedules(data);
            } catch (error) {
                console.error('Error loading schedules:', error);
            }
        };
        loadNotices(enterName);
        loadSchedules(enterName); // enterName을 전달
    }, [enterName]);

    const handleCreateNotice = async (newNotice) => {
        try {
            const createdNotice = await createNotice(newNotice);
            setNotices(prevNotices => [...prevNotices, createdNotice]);
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

    return (
        <div className="App">
            <EnterHeader/>
            <Notices notices={notices} onAddNotice={handleCreateNotice}/>
            <EnterSchedule schedules={schedules}/>
        </div>
    );
};

export default EnterPage;