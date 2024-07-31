import React from 'react';
import Notice from './Notice';
import GroupSchedule from './GroupSchedule';

const EntertainerPage = () => {
    return (
        <div className="entertainer-page">
            <h1>엔터테이너 페이지</h1>
            <Notice />
            <GroupSchedule />
        </div>
    );
};

export default EntertainerPage;
