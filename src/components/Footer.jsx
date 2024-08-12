import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-title">
                    <a href="/" className="footer-link">FANTREEHOUSE</a>
                </div>
                <div className="footer-links">
                    <a href="https://github.com/FanTree-House/FanTree-Back/blob/main/README.md">Info</a>
                    <a href="">Survey</a>
                    <a href="https://nbcamp.spartacodingclub.kr/">Support</a>
                    <a href="https://www.notion.so/teamsparta/67b0dd55fd384f6bbe2f635feb4d0c38">Terms of Use</a>
                    <a href="https://github.com/FanTree-House">Our Records</a>
                </div>
                <p className="footer-copyright">&copy; FanTreeCompany</p>
            </div>
        </footer>
    );
};

export default Footer;