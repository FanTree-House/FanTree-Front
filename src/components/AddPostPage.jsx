import React, { useState } from 'react';

const AddPostPage = () => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 파일 및 내용 제출 로직 추가
        console.log('파일:', file);
        console.log('내용:', content);
    };

    const handleCancel = () => {
        // 취소 버튼 클릭 시 처리 (예: 이전 페이지로 이동)
        window.history.back();
    };

    return (
        <div>
            <h2>게시글 추가</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>파일 업로드:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea value={content} onChange={handleContentChange} />
                </div>
                <button type="submit">생성</button>
                <button type="button" onClick={handleCancel}>취소</button>
            </form>
        </div>
    );
};

export default AddPostPage;
