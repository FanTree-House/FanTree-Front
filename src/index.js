import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client'에서 createRoot를 임포트합니다.
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// createRoot를 사용하여 루트 요소를 생성합니다.
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// render 메소드에 Router와 App 컴포넌트를 전달합니다.
root.render(
    <Router>
        <App />
    </Router>
);