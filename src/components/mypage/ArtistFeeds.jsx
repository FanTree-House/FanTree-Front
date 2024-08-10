import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axiosInstance from "../../service/AxiosInstance";

const ArtistFeeds = () => {


    const [artists, setArtists] = useState([
        {id: 1, name: '아티스트1', image: 'artist1.jpg'},
        {id: 2, name: '아티스트2', image: 'artist2.jpg'},
        {id: 3, name: '아티스트3', image: 'artist3.jpg'},
    ]);
    const [posts, setPosts] = useState([
        {id: 1, artistId: 1, content: '최근 글 1'},
        {id: 2, artistId: 2, content: '최근 글 2'},
        {id: 3, artistId: 3, content: '최근 글 3'},
    ]);

    const accessToken = localStorage.getItem('accessToken');

//구독한 아티스트 피드 보기
    useEffect(() => {
        // 구독한 아티스트 피드 보기 API 호출
        axiosInstance.get('/artistGroup/subscript/feeds', {
            headers: {
                'Authorization': `${accessToken}`
            }
        })
            .then(response => {
                const data = response.data;  // response.data 가져오기
                console.log(data);

                const feeds = data.data.slice(0, 3); // 상위 3개의 피드 데이터 사용
                const newArtists = feeds.map(feed => ({
                    id: feed.data.id,
                    name: feed.data.artistName,
                    image: feed.data.imageUrls[0] // 첫 번째 이미지를 사용
                }));
                const newPosts = feeds.map(feed => ({
                    // id: feed.data.id,
                    // artistId: feed.data.id,
                    content: feed.contents
                }));

                // 기존 상태와 병합
                setArtists(prevArtists => (
                    [...prevArtists.slice(0, 3), ...newArtists]
                ));
                setPosts(prevPosts => (
                    [...prevPosts.slice(0, 3), ...newPosts]
                ));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [accessToken]);

    const toggleSubscription = (id) => {
        setArtists(artists.map(artist =>
            artist.id === id ? {...artist, subscribed: !artist.subscribed} : artist
        ));
    };
    return (
        <div className="artist-feeds" style={{flex: '1/3', marginLeft: '10px'}}>
            {posts.length === 0 ? (
                <p>등록된 글이 없습니다.</p>
            ) : (
                posts.map(post => {
                    const artist = artists.find(artist => artist.id === post.artistId);
                    return (
                        <div key={post.id} className="artist-item"
                             style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                            <Link to={`/artist/${artist.id}`}>
                                <Image src={artist.image} rounded className="artist-image"
                                       style={{width: '50px', height: '50px', marginRight: '10px'}}/>
                            </Link>
                            <div style={{flex: '1'}}>
                                <p>{artist.name}</p>
                                <Link to={`/post/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                    <p>{post.content}</p>
                                </Link>
                            </div>
                            <button
                                onClick={() => toggleSubscription(artist.id)}
                                style={{
                                    background: artist.subscribed ? 'gold' : 'lightgray',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px'
                                }}
                            >
                                ★
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    )
}
    export default ArtistFeeds;