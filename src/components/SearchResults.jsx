import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const results = location.state?.results || [];

    // 이미지 URL을 가져오는 함수
    const getImageUrl = (group) => {
        return group.artistGroupProfileImageUrl || 'https://via.placeholder.com/150';
    };

    return (
        <div>
            <Header />
            <div className="search-results-container">
                <h2 className="search-results-title">검색 결과</h2>
                {results.length > 0 ? (
                    <div className="row">
                        {results.map((group) => (
                            <div className="col-md-4 mb-4" key={group.id}>
                                <Link to={`/group/${group.groupName}`} className="card-link">
                                    <div className="card">
                                        <img
                                            src={getImageUrl(group)}
                                            className="card-img-top"
                                            alt={group.groupName}
                                            onError={(e) => {e.target.onerror = null; e.target.src='https://via.placeholder.com/150'}}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{group.groupName}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;