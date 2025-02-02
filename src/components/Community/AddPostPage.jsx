// src/components/AddPostPage.jsx
import React, { useState } from 'react';
import { createFeed } from '../../service/communityApi'; // createFeed 함수 임포트
import './AddPostPage.css';
import  './CreateCommunityFeed.css'
import {useParams} from "react-router-dom"; // CSS 파일 임포트
import Header from "../../components/Header";

const AddPostPage = () => {
    const [file, setFile] = useState(null);
    const [contents, setContents] = useState('');
    const {groupName} = useParams();


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleContentChange = (e) => {setContents(e.target.value);};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // const requestDto = JSON.stringify({ contents : contents });
        // formData.append('requestDto', new Blob([requestDto], { type: 'application/json' }));
        formData.append('contents', contents)
        // 파일이 null이 아닌 경우에만 formData에 추가
        if (file) {
            formData.append('file', file);
        }

        try {
            const newFeed = await createFeed(groupName, formData);
            console.log('피드 생성 성공:', newFeed);
            window.history.back();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className="add-post-container">
            <Header/>
            <h2 className="add-post-title">게시글 추가</h2>
            <form className="add-post-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">파일 업로드:</label>
                    <input type="file" className="form-input" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">내용:</label>
                    <textarea
                        className="form-textarea"
                        value={contents}
                        onChange={handleContentChange}
                        placeholder="내용을 입력하세요..."
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn-submit">생성</button>
                    <button type="button" className="btn-cancel" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default AddPostPage;