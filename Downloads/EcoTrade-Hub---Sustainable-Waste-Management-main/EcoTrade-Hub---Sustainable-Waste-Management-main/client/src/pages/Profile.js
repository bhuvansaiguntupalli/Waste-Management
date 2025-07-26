import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';
import { FaUser, FaBuilding, FaUserTag, FaEnvelope, FaUserShield, FaSpinner } from 'react-icons/fa';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};
    console.log(userData);
    
    if (loading) {
        return (
            <section className="section-cards fade-in-up">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <FaSpinner style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                    <p>Loading your profile...</p>
                </div>
            </section>
        );
    }

    if (!Auth.loggedIn()) {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Access Required</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    You need to be logged in to view your profile
                </p>
            </section>
        );
    }

    return (
        <section id="profile-section" className="section-cards fade-in-up">
            <h2 className="section-headings">My Profile</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Welcome back, {userData.firstName}! Here's your account information.
            </p>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                <div style={{ 
                    background: 'var(--glass-bg)', 
                    padding: '1.5rem', 
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <FaUser style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Personal Information</h3>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li className="cards-list-items">
                            <strong>Full Name:</strong> 
                            <span className="cards-spans">{`${userData.firstName} ${userData.lastName}`}</span>
                        </li>
                        <li className="cards-list-items">
                            <strong>Username:</strong> 
                            <span className="cards-spans">{`${userData.username}`}</span>
                        </li>
                        <li className="cards-list-items">
                            <strong>Email:</strong> 
                            <span className="cards-spans">{`${userData.email}`}</span>
                        </li>
                    </ul>
                </div>

                <div style={{ 
                    background: 'var(--glass-bg)', 
                    padding: '1.5rem', 
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <FaBuilding style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Business Information</h3>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li className="cards-list-items">
                            <strong>Company:</strong> 
                            <span className="cards-spans">{`${userData.company}`}</span>
                        </li>
                        <li className="cards-list-items">
                            <strong>Account Type:</strong> 
                            <span className="cards-spans" style={{ 
                                background: userData.userType === 'Seller' ? 'var(--success-color)' : 'var(--accent-color)',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                            }}>
                                {`${userData.userType}`}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Profile;