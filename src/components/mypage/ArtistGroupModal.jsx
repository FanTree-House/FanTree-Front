import React, { useState, useEffect } from 'react';
import './ButtonWithModal.css';
import './ArtistGroupModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments, faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../service/apiClient';


const ArtistGroupModal = ({ onClose }) => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subscriptions, setSubscriptions] = useState({});
    const [updatedSubscriptions, setUpdatedSubscriptions] = useState({});
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const response = await apiClient.get('/artistGroup/subscript', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`
                    }
                });

                const groups = response.data;


                // 그룹 이름을 포함하여 각 그룹의 이미지 URL을 가져오기 위한 API 호출
                const groupsWithImages = await Promise.all(groups.flatMap(async (group) => {
                    try {
                        const imageResponse = await apiClient.get(`/artistgroup/${group.group_name}`,{
                            headers: {
                                'Authorization': `${accessToken}`
                            }
                            });

                        return {
                            ...group,
                            artistGroupProfileImageUrl: imageResponse.data.artistGroupProfileImageUrl
                        };
                    } catch (imageError) {
                        console.error(`Error fetching image for ${group.groupName}:`, imageError);
                        return {
                            ...group,
                            artistGroupProfileImageUrl: null
                        };
                    }
                }));

                // 초기 구독 상태 설정
                const initialSubscriptionState = {};
                groupsWithImages.forEach(group => {
                    initialSubscriptionState[group.group_name] = true; // 기본적으로 구독 상태로 설정
                });

                setSubscriptions(initialSubscriptionState);
                setArtistGroups(groupsWithImages);

            } catch (fetchError) {
                console.error('Error fetching artist groups:', fetchError);
                setError('구독하고 있는 그룹이 없습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtistGroups();
    }, [accessToken]);

    const handleSubscriptionToggle = (groupName) => {
        const isCurrentlySubscribed = subscriptions[groupName];
        const newSubscriptionState = !isCurrentlySubscribed;

        // 상태 변경 및 업데이트를 위한 상태 객체에 추가
        setSubscriptions(prevSubscriptions => ({
            ...prevSubscriptions,
            [groupName]: newSubscriptionState
        }));

        // 구독 취소 요청을 위한 업데이트 상태 객체에 추가
        setUpdatedSubscriptions(prevUpdatedSubscriptions => ({
            ...prevUpdatedSubscriptions,
            [groupName]: newSubscriptionState ? null : isCurrentlySubscribed // 구독 취소 상태를 null로 설정
        }));
    };

    // 모달을 닫을 때 구독 상태를 서버로 전송하는 함수
    const handleClose = async () => {
        try {
            const updates = Object.keys(updatedSubscriptions).map(async groupName => {
                const shouldUnsubscribe = updatedSubscriptions[groupName] !== null;

                if (shouldUnsubscribe) {
                    const endpoint = `/artistGroup/subscript/${groupName}`;
                    return apiClient.delete(endpoint, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${accessToken}`
                        }
                    });
                }
            });

            await Promise.all(updates.filter(update => update)); // null 값 필터링

        } catch (error) {
            console.error('Error updating subscription statuses:', error);
        } finally {
            onClose(); // 모달 닫기
        }
    };

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>구독한 아티스트 그룹</h2>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal-overlay" >
                <div className="modal-content" >
                    <h2>구독한 아티스트 그룹</h2>
                    <p>{error}</p>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>구독한 아티스트 그룹</h2>
                {artistGroups.length === 0 ? (
                    <div className="no-subscriptions-message">
                        <p>구독한 그룹이 없습니다</p>
                    </div>
                ) : (
                    <div className="artist-group-container">
                        {artistGroups.map((group) => (
                            <div key={group.id} className="artist-group-card">
                                <a href={`/group/${group.group_name}?enter=${group.enterName}`} className="artist-group-link">
                                    <div className="artist-group-image-container">
                                        {group.artistGroupProfileImageUrl ? (
                                            <img
                                                src={group.artistGroupProfileImageUrl}
                                                alt={group.group_name}
                                                className="artist-group-image"
                                            />
                                        ) : (
                                            <div className="artist-group-placeholder">No Image</div>
                                        )}
                                    </div>
                                </a>
                                <div className="artist-group-details">
                                    <div className="artist-group-name">
                                        {group.group_name}
                                    </div>
                                    <div className="group-modal-buttons">
                                        <button
                                            className={`subscription-button ${subscriptions[group.group_name] ? 'subscribed' : 'not-subscribed'}`}
                                            onClick={() => handleSubscriptionToggle(group.group_name)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faStarSolid}
                                                size="lg"
                                                style={{ color: subscriptions[group.group_name] ? "#51d5fd" : "#d3d3d3" }}
                                            />
                                        </button>
                                        <button
                                            className="community-button"
                                            onClick={() => window.location.href = `/group/${group.group_name}/community`}
                                            title={`${group.group_name} 커뮤니티로 이동`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faComments}
                                                size="lg"
                                                style={{ color: "#7341ff" }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button className="modal-close" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default ArtistGroupModal;
