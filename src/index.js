import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client'에서 createRoot를 임포트합니다.
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter를 직접 임포트합니다.
import reportWebVitals from './reportWebVitals';
import App from './App';

// createRoot를 사용하여 루트 요소를 생성합니다.
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// render 메소드에 BrowserRouter와 App 컴포넌트를 전달합니다.
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
