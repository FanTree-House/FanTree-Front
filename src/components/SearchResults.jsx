// src/components/SearchResults.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const results = location.state?.results || [];

    return (
        <div className="search-results">
            <h2>검색 결과</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((group) => (
                        <li key={group.id}>
                            <Link to={`/artistgroup/${group.groupName}/feed`}>
                                {group.groupName}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default SearchResults;