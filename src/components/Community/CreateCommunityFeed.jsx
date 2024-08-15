import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './CreateCommunityFeed.css'
import Header from "../../components/Header";

const CreateCommunityFeed = () => {
    const {groupName} = useParams()
    const navigate = useNavigate();

    const openAddPostPage = () =>
        navigate(`/group/${groupName}/community/addpost`)

    return (
        <div>
            <header/>
            <button className={"add-post-button"} onClick={() => openAddPostPage()}>게시글 추가하기</button>
            {/*<button  onClick={() => openAddPostPage()}>+</button> /!* "+" 버튼 *!/*/}
        </div>
    );
};

export default CreateCommunityFeed;
