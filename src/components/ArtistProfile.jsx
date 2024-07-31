import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistProfile = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/artists/${id}`);
                setArtist(response.data);
            } catch (err) {
                setError('아티스트 프로필을 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchArtist();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!artist) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="artist-profile">
            <h1>{artist.artistName}</h1>
            <img src={artist.photoUrl} alt={`${artist.artistName} 프로필 사진`} />
            {/* 아티스트의 추가 정보를 표시할 수 있습니다. */}
        </div>
    );
};

export default ArtistProfile;
