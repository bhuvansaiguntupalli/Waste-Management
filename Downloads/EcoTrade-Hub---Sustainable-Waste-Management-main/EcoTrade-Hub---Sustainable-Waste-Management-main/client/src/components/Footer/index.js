import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <h4>Developed by Sriram Bandlamudi<br></br>Full Stack Web Developer</h4>
            <ul>
                <li><a className="footer-links" href="https://github.com/srirambandlamudi"><FaGithub /></a></li>
                <li><a className="footer-links" href="https://www.linkedin.com/in/sriram-bandlamudi"><FaLinkedin /></a></li>
                <li><a className="footer-links" href="https://stackoverflow.com/users/sriram-bandlamudi"><FaStackOverflow /></a></li>
            </ul>
        </footer>
    )
}

export default Footer;