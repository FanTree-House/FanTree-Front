import React from 'react';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>아티스트계정 및 엔터공지사항, 아티스트 프로필 조회 및 전체 조회</h1>
            <p>상단링크로 들어갈것</p>
        </div>
    );
};

export default HomePage;



// const HomePage = () => {
//
//     const [loginType, setLoginType] = useState("USER");
//
//     useEffect(() => {
//
//         // 1. 서버로부터 데이터를 가져온다(유저타입)
//
//         // 2. 해당 유저 타입을 세팅한다
//         setLoginType(~~~~);
//     }, []);
//
//     if (loginType === "USER") {
//         return <div>
//             첫 번재 유저 타입
//         </div>
//     }
//
//     if (loginType === "ADMIN") {
//         return <div>
//             두 번재 유저 타입
//         </div>
//     }

