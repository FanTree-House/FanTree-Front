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
                    <a href="/info">Info</a>
                    <a href="/support">Support</a>
                    <a href="/marketing">Marketing</a>
                    <a href="/terms">Terms of Use</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>
                <p className="footer-copyright">&copy; FanTreeCompany</p>
            </div>
        </footer>
    );
};

export default Footer;