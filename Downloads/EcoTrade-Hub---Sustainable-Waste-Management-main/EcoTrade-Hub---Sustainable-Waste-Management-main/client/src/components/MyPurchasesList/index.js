import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_PURCHASE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { FaUser, FaEnvelope, FaBoxes, FaDollarSign, FaCube, FaRuler, FaMapMarkerAlt, FaTrash, FaSpinner, FaShoppingBag } from 'react-icons/fa';

const MyPurchasesList = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || {};
    const [removePurchase, { loading: removeLoading }] = useMutation(REMOVE_PURCHASE);

    const handleRemovePurchase = async (offerId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removePurchase({
                variables: { offerId }
            });

            if (!data) {
                throw new Error('something did not work!');
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    if (loading) {
        return (
            <section className="section-cards fade-in-up">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <FaSpinner style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                    <p>Loading your purchases...</p>
                </div>
            </section>
        );
    }

    if (!Auth.loggedIn()) {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Access Required</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    You need to be logged in to view your purchases
                </p>
            </section>
        );
    } 
    
    if (Auth.getProfile().data.userType !== 'Recycler') {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Recycler Access Only</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    This feature is available only for Recycler accounts
                </p>
            </section>
        )
    }

    return (
        <section id="myPurchases-section" className="fade-in-up">
            <h2 className="section-headings">My Purchased Materials</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Track your sustainable material purchases
            </p>
            
            {!me.myPurchases || me.myPurchases.length === 0 ? (
                <div className="section-cards" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        You haven't purchased any materials yet. Browse available offers!
                    </p>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {me.myPurchases?.map((myPurchase) => (
                        <div className="section-cards offer-cards" key={myPurchase._id}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '1rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--glass-border)'
                            }}>
                                <h4 className="offer-ids" style={{ margin: 0 }}>
                                    Order #{myPurchase._id.slice(-6)}
                                </h4>
                                <span style={{ 
                                    background: 'var(--accent-color)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    Purchased
                                </span>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start' }}>
                                <div className="offer-lists">
                                    <div className="cards-list-items">
                                        <FaUser style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Seller:</strong> <span className="cards-spans">{myPurchase.seller}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaEnvelope style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Contact:</strong> 
                                        <a 
                                            href={`mailto:${myPurchase.email}`}
                                            style={{ 
                                                color: 'var(--accent-color)', 
                                                textDecoration: 'none',
                                                marginLeft: '0.5rem'
                                            }}
                                        >
                                            {myPurchase.email}
                                        </a>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaBoxes style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Quantity:</strong> <span className="cards-spans">{myPurchase.palletQty} units</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaDollarSign style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Price:</strong> <span className="cards-spans">${myPurchase.price.toLocaleString('en-US')} USD</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaCube style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Material:</strong> <span className="cards-spans">{myPurchase.material}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaRuler style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Dimensions:</strong> <span className="cards-spans">{myPurchase.dimension}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaMapMarkerAlt style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Pickup Location:</strong> <span className="cards-spans">{myPurchase.address}, {myPurchase.state}</span>
                                    </div>
                                </div>
                                
                                <img 
                                    className="offer-img" 
                                    src={require(`../../assets/images/${myPurchase.image}`)} 
                                    alt='purchased-material'
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                            </div>
                            
                            <div className="offer-btn-div" style={{ marginTop: '1.5rem' }}>
                                <button 
                                    id="remove-btn" 
                                    className={`btns delete-btns ${removeLoading ? 'loading' : ''}`} 
                                    onClick={() => handleRemovePurchase(myPurchase._id)}
                                    disabled={removeLoading}
                                >
                                    {removeLoading ? 'Removing...' : (
                                        <>
                                            <FaTrash style={{ marginRight: '0.5rem' }} />
                                            Remove from List
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyPurchasesList;