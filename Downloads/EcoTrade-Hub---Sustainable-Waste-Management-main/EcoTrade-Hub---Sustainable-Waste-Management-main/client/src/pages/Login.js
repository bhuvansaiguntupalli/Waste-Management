import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import validateEmail from '../utils/helpers';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [requiredField, setRequiredField] = useState('');
    const [loginUser, { error, loading }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formState.email) {
            setRequiredField("Email address is required");
            return;
        } if (formState.email && !validateEmail(formState.email)) {
            setRequiredField("The Email address is not valid");
            return;
        } if (!formState.password) {
            setRequiredField("Password is required");
            return;
        }

        try{
            const { data } = await loginUser({
                variables: { ...formState },
            });

            Auth.login(data.loginUser.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <section id="login-section" className="section-cards fade-in-up">
            <h2 className="section-headings">Welcome Back</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Sign in to access your EcoTrade Hub account
            </p>
            <form id="login-form" className="forms" onSubmit={handleFormSubmit}>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
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
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="password">
                        <FaLock style={{ marginRight: '0.5rem' }} />
                        Password
                    </label>
                    <input 
                        className="form-inputs"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                {requiredField && (
                    <div className="error-message">{requiredField}</div>
                )}
                <div className="forms-btn-div">
                    <button 
                        id="login-btn" 
                        className={`btns ${loading ? 'loading' : ''}`} 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : (
                            <>
                                <FaSignInAlt style={{ marginRight: '0.5rem' }} />
                                Sign In
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

export default Login;