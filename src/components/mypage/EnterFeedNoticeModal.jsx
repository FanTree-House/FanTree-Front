import React, {useEffect, useState} from 'react';
import './EnterFeedNoticeModal.css';
import axios from 'axios';

const EnterFeedNoticeModal = ({onClose}) => {
    const [notices, setNotices] = useState([]); // 공지사항 목록을 담을 상태 변수
    const [expandedNoticeIndex, setExpandedNoticeIndex] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태를 표시하기 위한 상태 변수
    const [error, setError] = useState(null); // 에러 메시지를 담을 상태 변수
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    useEffect(() => {
        const fetchGroupNames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/artistGroup/subscript', {
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

        const fetchNotices = async (groupNames) => {
            try {
                const noticePromises = groupNames.map(async (groupName) => {
                    const response = await axios.get(`http://localhost:8080/feed/${groupName}/notices/createdAt`, {
                        headers: {
                            'Authorization': `${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    return response.data.data;
                });

                const allNotices = await Promise.all(noticePromises); // 모든 그룹의 공지사항을 비동기적으로 가져옴
                const flatNotices = allNotices.flat(); // 공지사항 리스트를 평탄화

                // 공지사항을 createdAt 기준으로 내림차순 정렬
                const sortedNotices = flatNotices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setNotices(sortedNotices); // 상태에 정렬된 공지사항 설정
            } catch (error) {
                console.error('Error fetching notices:', error);
                setError('Failed to fetch notices');
            } finally {
                setLoading(false);
            }
        };

            const loadNotices = async () => {
                const groupNames = await fetchGroupNames(); // 그룹 이름을 먼저 가져옴
                if (groupNames.length > 0) {
                    fetchNotices(groupNames); // 그룹 이름이 존재하면 공지사항을 가져옴
                }
            };

            loadNotices(); // 컴포넌트가 마운트될 때 공지사항을 로드
        }, [accessToken]);

        // 공지사항 제목 클릭 시 내용을 토글하는 함수
        const toggleNoticeContent = (index) => {
            setExpandedNoticeIndex(expandedNoticeIndex === index ? null : index);
        };

        // 로딩 중일 때 로딩 메시지 표시
        if (loading) {
            return (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Loading...</h2>
                    </div>
                </div>
            );
        }

        // 에러 발생 시 에러 메시지 표시
        if (error) {
            return (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="error-message">{error}</div>
                        <button className="modal-close" onClick={onClose}>Close</button>
                    </div>
                </div>
            );
        }

        // 공지사항 목록을 표시하는 UI
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>Close</button>
                    {/* 닫기 버튼 */}
                    <h2>공지사항</h2>
                    <div className="notices-container">
                        {notices.length === 0 ? (
                            <p>등록된 공지사항이 없습니다.</p> // 공지사항이 없을 경우 메시지 표시
                        ) : (
                            <ul>
                                {notices.map((notice, index) => (
                                    <li key={index} className="notice-item">
                                        <div className="notice-header">
                                            <span className="notice-group">{notice.groupName}</span>
                                            <h3
                                                className="notice-title"
                                                onClick={() => toggleNoticeContent(index)}
                                            >
                                                {notice.title}
                                                <span
                                                    className={`arrow ${expandedNoticeIndex === index ? 'up' : 'down'}`}>&#9660;</span>
                                            </h3>
                                            <span
                                                className="notice-date">{new Date(notice.createdAt).toLocaleString()}</span>
                                        </div>
                                        {expandedNoticeIndex === index && (
                                            <div className="notice-content">
                                                <p>{notice.contents}</p>
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

    export default EnterFeedNoticeModal;
