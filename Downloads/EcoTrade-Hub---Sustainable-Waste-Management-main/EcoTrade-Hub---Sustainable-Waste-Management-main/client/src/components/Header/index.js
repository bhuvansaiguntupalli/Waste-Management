import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { FaLeaf, FaInfoCircle, FaTruck } from 'react-icons/fa'; 
import { GoSignIn } from 'react-icons/go';
import { GiArchiveRegister, GiFiles } from 'react-icons/gi';
import { RiLogoutBoxRFill, RiFileEditFill } from 'react-icons/ri';
import { BsFilePersonFill } from 'react-icons/bs';
import { MdLocalOffer } from 'react-icons/md';

const Header = () => {
    
    return (
        <header>
            <h1>EcoTrade <FaLeaf /> Hub</h1>
            {Auth.loggedIn() ? (
                <nav>
                    {Auth.getProfile().data.userType === 'Seller' ? (
                        <ul>
                            <li><Link className="links" to="/me/myOffers"><GiFiles /> My Offers</Link></li>
                            <li><Link className="links" to="/createOffer"><RiFileEditFill /> Create Offer</Link></li>
                            <li><Link className="links" to="/me"><BsFilePersonFill /> Profile</Link></li>
                            <li><Link className="links" onClick={Auth.logout} to="/"><RiLogoutBoxRFill /> Logout</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link className="links" to="/allOffers"><MdLocalOffer /> All Offers</Link></li>
                            <li><Link className="links" to="/me/myPurchases"><FaTruck /> My Purchases</Link></li>
                            <li><Link className="links" to="/me"><BsFilePersonFill /> Profile</Link></li>
                            <li><Link className="links" onClick={Auth.logout} to="/"><RiLogoutBoxRFill /> Logout</Link></li>
                        </ul>
                    )}
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li><Link className="links" to="/"><FaInfoCircle /> About</Link></li>
                        <li><Link className="links" to="/login"><GoSignIn /> Login</Link></li>
                        <li><Link className="links" to="/signup"><GiArchiveRegister /> Sign Up</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;