import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import styled from 'styled-components';
import { createFeed } from '../service/ArtistFeedService';
import Header from '../components/Header';

// 스타일 정의
const Container = styled.div`
    width: 50%;
    margin: 20px auto 0; 
    padding: 130px;
    background-color: #ffffff;
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

const ImageInputContainer = styled.div`
    width: 100%;
    padding: 10px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
    box-sizing: border-box;
`;

const ImagePreviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

const ImagePreview = styled.div`
    width: calc(33.333% - 10px);
    padding-top: 33.333%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-color: #f0f0f0;
    cursor: pointer; /* 클릭 가능한 커서 추가 */
`;

const PreviewImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    const { groupName } = useParams(); // URL 파라미터에서 groupName 가져오기
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 추가

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleImageClick = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            alert('내용을 입력해 주세요.');
            return;
        }

        if (!groupName) {
            alert('유효한 그룹 이름을 제공해 주세요.');
            return;
        }

        try {
            await createFeed(groupName, content, images);
            alert('피드가 성공적으로 작성되었습니다!');
            setContent('');
            setImages([]);
            navigate(`/group/${groupName}`); // 그룹 페이지로 이동
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <h2>Create Feed for {groupName}</h2>
                <form onSubmit={handleSubmit}>
                    <ImageInputContainer>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        {images.length > 0 && (
                            <ImagePreviewContainer>
                                {images.map((image, index) => (
                                    <ImagePreview key={index} onClick={() => handleImageClick(index)}>
                                        <PreviewImage
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${index + 1}`}
                                        />
                                    </ImagePreview>
                                ))}
                            </ImagePreviewContainer>
                        )}
                    </ImageInputContainer>
                    <ContentTextArea
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                    <SubmitButton type="submit">작성하기</SubmitButton>
                </form>
            </Container>
        </div>
    );
};

export default CreateArtistFeedPage;