import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistProfile = () => {
    const { artistId } = useParams(); // URL 파라미터에서 artistId를 추출
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                setLoading(true);
                // artistId를 사용하여 아티스트 정보를 가져옴
                const response = await axios.get(`http://localhost:8080/artist/${artistId}`);
                if (response.data) {
                    setArtist(response.data);
                } else {
                    setError('아티스트를 찾을 수 없습니다.');
                }
            } catch (err) {
                setError('아티스트 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (artistId) {
            fetchArtist();
        }
    }, [artistId]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!artist) {
        return <p>아티스트를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="artist-profile">
            <h1>{artist.artistName}</h1>
            <h2>{artist.introduction}</h2>
            <img src={artist.file} alt={`${artist.artistName} 프로필 사진`} />
            {/* 아티스트의 추가 정보를 표시할 수 있습니다. */}
        </div>
    );
};

export default ArtistProfile;
