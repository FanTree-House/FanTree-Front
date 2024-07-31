import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notices = () => {
    const [Notices, setNotices] = useState([]);

    useEffect(() => {
        // 예제 데이터 사용
        const fetchNotices = async () => {
            const response = await axios.get('/api/notice'); // 실제 API 엔드포인트로 변경
            setNotices(response.data);
        };

        fetchNotices();
    }, []);

    return (
        <div className="Notices">
            <h2>공지사항</h2>
            <ul>
                {Notices.map((Notice, index) => (
                    <li key={index}>{Notice}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notices;
