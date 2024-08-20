import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntertainment, updateEntertainment, deleteEntertainment } from '../service/EntertainmentService';
import Header from '../components/Header';

const EntertainmentEditPage = () => {
    const [enterName, setEnterName] = useState('');
    const [enterNumber, setEnterNumber] = useState('');
    const [file, setFile] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = window.localStorage.getItem('accessToken');
            if (!token) {
                setMessage('권한이 없습니다. 로그인이 필요합니다.');
                return;
            }

            try {
                const data = await getEntertainment(token);
                setEnterName(data.enterName);
                setEnterNumber(data.enterNumber);
                // 로고 이미지 가져오는 로직 추가 가능
            } catch (error) {
                alert(error.response.data.message);
                setMessage('엔터 정보를 가져오는데 실패했습니다: ' + error.message);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        const token = window.localStorage.getItem('accessToken');

        if (!token) {
            setMessage('권한이 없습니다. 로그인이 필요합니다.');
            return;
        }

        try {
            const enterData = {
                enterName,
                enterNumber: parseInt(enterNumber),
                file
            };

            await updateEntertainment(enterName, enterData, token);
            alert('엔터테인먼트 계정이 성공적으로 수정되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('엔터테인먼트 계정 수정 실패:', error);
            setMessage('엔터테인먼트 계정 수정에 실패했습니다: ' + error.message);
        }
    };

    const handleDelete = async () => {
        const token = window.localStorage.getItem('accessToken');

        if (!token) {
            setMessage('권한이 없습니다. 로그인이 필요합니다.');
            return;
        }

        if (window.confirm('정말로 이 엔터테인먼트를 삭제하시겠습니까?')) {
            try {
                await deleteEntertainment(enterName, token);
                alert('엔터테인먼트 계정이 성공적으로 삭제되었습니다.');
                navigate('/');
            } catch (error) {
                console.error('엔터테인먼트 계정 삭제 실패:', error);
                setMessage('엔터테인먼트 계정 삭제에 실패했습니다: ' + error.message);
            }
        }
    };
    return (
        <>
            <Header />
            <div className="container">
                <h2>엔터테인먼트 계정 수정</h2>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="enterName">소속사 이름:</label>
                        {isEditingName ? (
                            <input
                                type="text"
                                id="enterName"
                                value={enterName}
                                onChange={(e) => setEnterName(e.target.value)}
                                className="input-field"
                                maxLength="20"
                            />
                        ) : (
                            <p>{enterName}</p>
                        )}
                        <button onClick={() => setIsEditingName(!isEditingName)}>
                            {isEditingName ? '저장' : '수정'}
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="enterNumber">사업자 번호:</label>
                        {isEditingNumber ? (
                            <input
                                type="number"
                                id="enterNumber"
                                value={enterNumber}
                                onChange={(e) => setEnterNumber(e.target.value)}
                                className="input-field"
                            />
                        ) : (
                            <p>{enterNumber}</p>
                        )}
                        <button onClick={() => setIsEditingNumber(!isEditingNumber)}>
                            {isEditingNumber ? '저장' : '수정'}
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="file" className="image-upload-label">
                            {file ? (
                                <img src={URL.createObjectURL(file)} alt="Logo" className="preview-image" />
                            ) : (
                                <div className="image-placeholder">이미지를 클릭하여 추가하세요</div>
                            )}
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="file-input"
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <button type="button" className="submit-button" onClick={handleUpdate}>수정 사항 저장</button>
                    <button type="button" className="delete-button" onClick={handleDelete}>계정 삭제</button>
                </div>
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default EntertainmentEditPage;