import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import validateEmail from '../utils/helpers';
import { FaUser, FaBuilding, FaEnvelope, FaLock, FaUserTag, FaUserPlus } from 'react-icons/fa';

const Signup = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        company: '',
        username: '',
        email: '',
        password: '',
        userType: '', 
    });

    const [requiredField, setRequiredField] = useState('');

    const [addUser, { error, loading }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formState.firstName) {
            setRequiredField("First Name is required");
            return;
        } if (!formState.lastName) {
            setRequiredField("Last Name is required");
            return;
        } if (!formState.company) {
            setRequiredField("Company is required");
            return;
        } if (!formState.username) {
            setRequiredField("Username is required");
            return;
        } if (!formState.email) {
            setRequiredField("Email address is required");
            return;
        } if (formState.email && !validateEmail(formState.email)) {
            setRequiredField("The Email address is not valid");
            return;
        } if (!formState.password) {
            setRequiredField("Password is required");
            return;
        } if (!formState.userType || formState.userType === '') {
            setRequiredField("Please select a User Type");
            return;
        }

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section id="signup-section" className="section-cards fade-in-up">
            <h2 className="section-headings">Join EcoTrade Hub</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Create your account and start trading sustainably
            </p>
            <form id="signup-form" className="forms" onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label className="forms-labels" htmlFor="firstName">
                            <FaUser style={{ marginRight: '0.5rem' }} />
                            First Name
                        </label>
                        <input 
                            className="form-inputs"
                            name="firstName"
                            type="text"
                            placeholder="Enter first name"
                            value={formState.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="forms-labels" htmlFor="lastName">
                            <FaUser style={{ marginRight: '0.5rem' }} />
                            Last Name
                        </label>
                        <input 
                            className="form-inputs"
                            name="lastName"
                            type="text"
                            placeholder="Enter last name"
                            value={formState.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="company">
                        <FaBuilding style={{ marginRight: '0.5rem' }} />
                        Company Name
                    </label>
                    <input 
                        className="form-inputs"
                        name="company"
                        type="text"
                        placeholder="Enter company name"
                        value={formState.company}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="username">
                        <FaUserTag style={{ marginRight: '0.5rem' }} />
                        Username
                    </label>
                    <input 
                        className="form-inputs"
                        name="username"
                        type="text"
                        placeholder="Choose a username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="email">
                        <FaEnvelope style={{ marginRight: '0.5rem' }} />
                        Email Address
                    </label>
                    <input 
                        className="form-inputs"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="password">
                        <FaLock style={{ marginRight: '0.5rem' }} />
                        Password
                    </label>
                    <input 
                        className="form-inputs"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="userType">
                        <FaUserTag style={{ marginRight: '0.5rem' }} />
                        Account Type
                    </label>
                    <select 
                        className="form-selects" 
                        name="userType" 
                        defaultValue="" 
                        onChange={handleChange}
                        style={{ padding: '1rem' }}
                    >
                        <option value="">Select your account type</option>
                        <option value="Seller">Seller - I want to sell materials</option>
                        <option value="Recycler">Recycler - I want to buy materials</option>
                    </select>
                </div>

                {requiredField && (
                    <div className="error-message">{requiredField}</div>
                )}

                <div className="forms-btn-div">
                    <button 
                        id="signup-btn" 
                        className={`btns ${loading ? 'loading' : ''}`} 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : (
                            <>
                                <FaUserPlus style={{ marginRight: '0.5rem' }} />
                                Create Account
                            </>
                        )}
                    </button>
                </div>
            </form>
            {error && (
                <div className="error-message">{error.message}</div>
            )}
        </section>
    );
};

export default Signup;