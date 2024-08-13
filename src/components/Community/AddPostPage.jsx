// src/components/AddPostPage.jsx
import React, { useState } from 'react';
import { createFeed } from '../../service/communityApi'; // createFeed 함수 임포트
import './AddPostPage.css';
import {useParams} from "react-router-dom"; // CSS 파일 임포트

const AddPostPage = () => {
    const [files, setFiles] = useState(null);
    const [contents, setContents] = useState('');
    const {groupName} = useParams();


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFiles((prevImages) => [...prevImages, ...files]);
    };

    const handleContentChange = (e) => {setContents(e.target.value);};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // const requestDto = JSON.stringify({ contents : content });
        // formData.append('requestDto', new Blob([requestDto], { type: 'application/json' }));
        formData.append('contents', contents)
        formData.append('file', files);

        try {
            const newFeed = await createFeed(groupName, formData);
            console.log('피드 생성 성공:', newFeed);
            window.history.back();
        } catch (error) {
            console.error('피드 생성 실패:', error);
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className="add-post-container">
            <h2 className="add-post-title">게시글 추가</h2>
            <form className="add-post-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">파일 업로드:</label>
                    <input type="files" className="form-input" onChange={handleFileChange} />
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