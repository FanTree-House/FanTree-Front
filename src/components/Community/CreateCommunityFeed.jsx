import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCommunityFeed = () => {
    const navigate = useNavigate();

    const handleAddPost = () => {
        navigate('/community/add-post'); // 버튼 클릭 시 다른 페이지로 이동
    };

    return (
        <div>
            <h2>게시글 추가하기</h2>
            <button onClick={handleAddPost}>+</button> {/* "+" 버튼 */}
        </div>
    );
};

export default CreateCommunityFeed;
