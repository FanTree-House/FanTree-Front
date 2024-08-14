import React, {useState, useEffect} from 'react';
import './ButtonWithModal.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../service/apiClient";

const ArtistGroupModal = ({onClose}) => {
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
                const groupsWithImages = await Promise.all(groups.map(async (group) => {
                    try {
                        const imageResponse = await apiClient.get(`/artistgroup/${group.group_name}`);
                        return {
                            ...group,
                            imageUrl: imageResponse.data.imageUrl
                        };
                    } catch (imageError) {
                        console.error(`Error fetching image for ${group.group_name}:`, imageError);
                        return {
                            ...group,
                            imageUrl: null
                        };
                    }
                }));

                // 설정: 모든 그룹을 구독 상태로 표시
                setArtistGroups(groupsWithImages);
                const initialSubscriptionState = {};
                groupsWithImages.forEach(group => {
                    initialSubscriptionState[group.group_name] = true; // 모든 그룹을 기본적으로 구독 상태로 설정
                });
                setSubscriptions(initialSubscriptionState);

            } catch (fetchError) {
                console.error('Error fetching artist groups:', fetchError);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchArtistGroups();
    }, [accessToken]);

    const handleSubscriptionToggle = (groupName) => {
        const currentSubscribedState = subscriptions[groupName];
        const newSubscribedState = !currentSubscribedState;

        // 상태를 변경하고 서버에 전송할 필요가 없는 상태 업데이트 객체에 추가
        setSubscriptions(prevSubscriptions => ({
            ...prevSubscriptions,
            [groupName]: newSubscribedState
        }));

        // 상태 업데이트를 위한 객체에 추가 (홀수번 클릭 시 변경된 상태를 서버로 전송하지 않음)
        setUpdatedSubscriptions(prevUpdatedSubscriptions => ({
            ...prevUpdatedSubscriptions,
            [groupName]: newSubscribedState ? currentSubscribedState : null // 상태를 null로 설정하면 서버 전송에서 제외
        }));
    };

    const handleClose = async () => {
        try {
            const updates = Object.keys(updatedSubscriptions).map(async groupName => {
                const endpoint = `http://localhost:8080/artistGroup/subscript/${groupName}`;
                const isSubscribed = updatedSubscriptions[groupName];

                // 상태가 null이 아닐 때만 서버로 전송
                if (isSubscribed !== null) {
                    return axios.delete(endpoint, { subscribed: isSubscribed }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
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
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>구독한 아티스트 그룹</h2>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>구독한 아티스트 그룹</h2>
                    <p>{error}</p>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>구독한 아티스트 그룹</h2>
                {artistGroups.length === 0 ? (
                    <div className="no-subscriptions-message">
                    <p>구독한 그룹이 없습니다</p>
                    </div>
                ) : (
                    <table className="artist-group-table">
                        <thead>
                        <tr>
                            <th className="subscription-col">Subscription</th>
                            <th className="image-col">Group Image</th>
                            <th className="name-col">Group Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {artistGroups.map((group, index) => (
                            <tr key={index}>
                                <td>
                                    <button
                                        className={`subscription-button ${subscriptions[group.group_name] ? 'subscribed' : 'not-subscribed'}`}
                                        onClick={() => handleSubscriptionToggle(group.group_name)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStarSolid}
                                            size="lg"
                                            style={{ color: subscriptions[group.group_name] ? "#82dbf6" : "#d3d3d3" }} // 색상 변경
                                        />
                                    </button>
                                </td>
                                <td>
                                    {group.imageUrl ? (
                                        <img src={group.imageUrl} alt={group.group_name} className="artist-group-image"/>
                                    ) : (
                                        <div className="artist-group-placeholder">No Image</div>
                                    )}
                                </td>
                                <td>{group.group_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                <button className="modal-close" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default ArtistGroupModal;
