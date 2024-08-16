import React, {useEffect, useState} from 'react';
import './EnterFeedScheduleModal.css';
import axios from 'axios';
import apiClient from "../../service/apiClient";


const EnterFeedScheduleModal = ({onClose}) => {
    const [schedules, setSchedules] = useState([]); // 스케줄 목록을 담을 상태 변수
    const [expandedNoticeIndex, setExpandedNoticeIndex] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태를 표시하기 위한 상태 변수
    const [error, setError] = useState(null); // 에러 메시지를 담을 상태 변수
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    useEffect(() => {
        const fetchGroupNames = async () => {
            try {
                const response = await apiClient.get('/artistGroup/subscript', {
                    headers: {
                        'Authorization': `${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const groupNames = response.data.map(group => group.group_name); // 그룹 이름 리스트 추출
                return groupNames;

            } catch (error) {
                console.error('Error fetching group names:', error);
                setError('Failed to fetch group names'); // 그룹 이름을 가져오는데 실패한 경우
                setLoading(false);
                return [];
            }
        };

        const fetchSchedules = async (groupNames) => {
            try {
                const schedulePromises = groupNames.map(async (groupName) => {
                    const response = await apiClient.get(`/feed/${groupName}/schedule/createdAt`, {
                        headers: {
                            'Authorization': `${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    return response.data.data;
                });

                const allSchedules = await Promise.all(schedulePromises);
                const flatSchedules = allSchedules.flat();

                // reated_at 기준으로 내림차순 정렬
                const sortedSchedules = flatSchedules.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setSchedules(sortedSchedules);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setError('Failed to fetch schedules');
            } finally {
                setLoading(false);
            }
        };

        const loadSchedules = async () => {
            const groupNames = await fetchGroupNames(); // 그룹 이름을 먼저 가져옴
            if (groupNames.length > 0) {
                fetchSchedules(groupNames); // 그룹 이름이 존재하면 스케줄을 가져옴
            }
        };

        loadSchedules(); // 컴포넌트가 마운트될 때 스케줄을 로드
    }, [accessToken]);

    // 스케줄 제목 클릭 시 내용을 토글하는 함수
    const toggleNoticeContent = (index) => {
        setExpandedNoticeIndex(expandedNoticeIndex === index ? null : index);
    };

    // 로딩 중일 때 로딩 메시지 표시
    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-content" >
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    // 에러 발생 시 에러 메시지 표시
    if (error) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="error-message">{error}</div>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>Close</button>
                {/* 닫기 버튼 */}
                <h2>구독한 그룹 스케줄</h2>
                <div className="schedules-container">
                    {schedules.length === 0 ? (
                        <p> 스케줄 관련 게시글이 없습니다. </p>
                    ) : (
                        <ul>
                            {schedules.map((schedule, index) => (
                                <li key={index} className="schedule-item">
                                    <div className="schedule-header">
                                        <span className="schedule-group">{schedule.groupName}</span>
                                        <h3
                                            className="schedule-title"
                                            onClick={() => toggleNoticeContent(index)}
                                        >
                                            {schedule.title}
                                            <span
                                                className={`arrow ${expandedNoticeIndex === index ? 'up' : 'down'}`}>&#9660;</span>
                                        </h3>
                                        <span
                                            className="schedule-date">{new Date(schedule.createdAt).toLocaleString()}</span>
                                    </div>
                                    {expandedNoticeIndex === index && (
                                        <div className="schedule-content">
                                            <p>{schedule.contents}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnterFeedScheduleModal;
