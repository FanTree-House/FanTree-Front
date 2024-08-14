import React, { useState, useEffect } from 'react';
import { createSchedule, createNotice, fetchSchedule, fetchNotices } from '../../service/Entertainer';
import Notices from './EnterNotice';
import ScheduleCalendar from './EnterSchedule'; // 실제 파일 이름에 맞게 수정
import Header from '../../components/Header'; // 헤더 컴포넌트 import
import '../../components/Header.css';
import './EntertainerPage.css';
import { useParams } from "react-router-dom";
import { useAuthState } from '../../context/AuthContext'; // 추가

const EnterPage = () => {
    const [notices, setNotices] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const { enterName } = useParams();
    const { userRole } = useAuthState(); // 권한 가져오기

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
            setNotices(prevNotices => [...prevNotices, createdNotice]);
        } catch (error) {
            console.error('Error adding notice:', error);
        }
    };

    const handleCreateSchedule = async (newSchedule) => {
        try {
            const createdSchedule = await createSchedule(newSchedule);
            setSchedules(prevSchedules => [...prevSchedules, createdSchedule]);
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <div className="EnterPage">
            <Header /> {/* Header 컴포넌트 추가 */}
            <Notices
                notices={notices}
                onAddNotice={handleCreateNotice}
                isVisible={userRole === 'ENTERTAINMENT'} // 공지사항 생성 버튼 보이기 여부
            />
            <ScheduleCalendar
                schedules={schedules}
                onAddSchedule={handleCreateSchedule}
                isVisible={userRole === 'ENTERTAINMENT'} // 스케줄 생성 버튼 보이기 여부
            />
        </div>
    );
};

export default EnterPage;

// import React, { useState, useEffect } from 'react';
// import { getEntertainment } from '../../service/EntertainmentService';
// import { createSchedule, createNotice, fetchSchedule, fetchNotices } from '../../service/Entertainer';
// import Notices from './EnterNotice';
// import ScheduleCalendar from './EnterSchedule';
// import Header from '../../components/Header';
// import EnterHeader from './EnterHeader';
// import CreateNotice from './CreateNotice'; // 추가된 import
// import '../../components/Header.css';
// import './EntertainerPage.css';
// import { useParams } from 'react-router-dom';
//
// const EnterPage = () => {
//     const [notices, setNotices] = useState([]);
//     const [schedules, setSchedules] = useState([]);
//     const [entertainment, setEntertainment] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
//     const { enterName } = useParams();
//     const token = window.localStorage.getItem('accessToken');
//
//     useEffect(() => {
//         const loadNotices = async () => {
//             try {
//                 const data = await fetchNotices(enterName);
//                 setNotices(data);
//             } catch (error) {
//                 console.error('Error loading notices:', error);
//             }
//         };
//
//         const loadSchedules = async () => {
//             try {
//                 const data = await fetchSchedule(enterName);
//                 setSchedules(data);
//             } catch (error) {
//                 console.error('Error loading schedules:', error);
//             }
//         };
//
//         const fetchEntertainmentData = async () => {
//             try {
//                 if (token) {
//                     const data = await getEntertainment(token);
//                     setEntertainment(data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching entertainment:', error);
//             }
//         };
//
//         loadNotices();
//         loadSchedules();
//         fetchEntertainmentData();
//     }, [enterName, token]);
//
//     const handleCreateNotice = async (newNotice) => {
//         try {
//             const createdNotice = await createNotice(newNotice);
//             setNotices(prevNotices => [...prevNotices, createdNotice]);
//         } catch (error) {
//             console.error('Error adding notice:', error);
//         }
//     };
//
//     const handleCreateSchedule = async (newSchedule) => {
//         try {
//             const createdSchedule = await createSchedule(newSchedule);
//             setSchedules(prevSchedules => [...prevSchedules, createdSchedule]);
//         } catch (error) {
//             console.error('Error creating schedule:', error);
//         }
//     };
//
//     const isEntertainmentCase = entertainment?.userRoleEnum === 'ENTERTAINMENT';
//     return (
//         <div className="EnterPage">
//             <Header />
//             <EnterHeader Entertainment={entertainment} />
//             {isEntertainmentCase && (
//                 <>
//                     <button className="add-notice-btn" onClick={() => setIsModalOpen(true)}>
//                         공지사항 작성하기
//                     </button>
//                     <button className="add-schedule-btn" onClick={() => setIsModalOpen(true)}>
//                         스케줄 생성하기
//                     </button>
//                 </>
//             )}
//             <Notices notices={notices} onAddNotice={handleCreateNotice} />
//             <ScheduleCalendar
//                 schedules={schedules}
//                 onAddSchedule={handleCreateSchedule}
//
//             />
//             <CreateNotice
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateNotice}
//             />
//         </div>
//     );
// };
//
// export default EnterPage;
