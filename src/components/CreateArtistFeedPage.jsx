import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // 그룹 이름을 URL 파라미터로 받기 위해 사용
import styled from 'styled-components';
import { createFeed } from '../services/feedService';

// 스타일 정의
const Container = styled.div`
    width: 60%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContentTextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
`;

const ImageInput = styled.input`
    margin-bottom: 20px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #9DE7FD;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #6fbfcb;
    }
`;

const CreateArtistFeedPage = () => {
    const { groupName } = useParams(); // URL에서 groupName을 가져옴
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createFeed(groupName, content, image);
            console.log('Feed created successfully:', response);
            alert('피드가 성공적으로 작성되었습니다!');
            // 피드 작성 후 초기화 또는 다른 페이지로 이동 로직 추가
            setContent('');
            setImage(null);
        } catch (error) {
            console.error('There was an error creating the feed:', error);
            alert('피드 작성에 실패했습니다.');
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <ContentTextArea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={handleContentChange}
                    required
                />
                <ImageInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <SubmitButton type="submit">작성하기</SubmitButton>
            </form>
        </Container>
    );
};

export default CreateArtistFeedPage;