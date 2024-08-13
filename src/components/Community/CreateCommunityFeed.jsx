import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const CreateCommunityFeed = () => {
    const {groupName} = useParams()
    const navigate = useNavigate();

    const openAddPostPage = () =>
        navigate(`/group/${groupName}/community/addpost`)

    return (
        <div>
            <h2>게시글 추가하기</h2>
            <button  onClick={() => openAddPostPage()}>+</button> {/* "+" 버튼 */}
        </div>
    );
};

export default CreateCommunityFeed;
