import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        // 예제 데이터 사용
        const fetchNotices = async () => {
            const response = { data: ["공지사항 1", "공지사항 2", "공지사항 3"] }; // 예제 데이터
            setNotices(response.data);
        };

        fetchNotices();
    }, []);

    return (
        <div className="notices">
            <h2>공지사항</h2>
            <ul>
                {notices.map((notice, index) => (
                    <li key={index}>{notice}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notice;
