import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_OFFERS } from '../../utils/queries';
import { ADD_PURCHASE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { FaUser, FaEnvelope, FaBoxes, FaDollarSign, FaCube, FaRuler, FaMapMarkerAlt, FaGlobe, FaCalendar, FaShoppingCart, FaSpinner } from 'react-icons/fa';

const AllOffersList = () => {
    const { loading, data } = useQuery(QUERY_OFFERS);
    const offers = data?.offers || [];
    const [addPurchase, { error, loading: purchaseLoading }] = useMutation(ADD_PURCHASE);
    console.log(offers);

    const handleSaveOffer = async (offerId) => {
        try {
            const { data } = await addPurchase({
                variables: { offerId }
            });
            if (!data) {
                throw new Error('something did not work!');
            }
        } catch (err) {
            console.error(err);
        }

        window.location.assign('me/myPurchases');
    };

    if (loading) {
        return (
            <section className="section-cards fade-in-up">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <FaSpinner style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                    <p>Loading available offers...</p>
                </div>
            </section>
        );
    }

    if (!Auth.loggedIn()) {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Access Required</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    You need to be logged in to view offers
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
        <section id="allOffers-section" className="fade-in-up">
            <h2 className="section-headings">Available Materials</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Browse and purchase sustainable materials from verified sellers
            </p>
            
            {offers.length === 0 ? (
                <div className="section-cards" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        No offers available at the moment. Check back later!
                    </p>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {offers.map((offer) => (
                        <div className="section-cards offer-cards" key={offer._id}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '1rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--glass-border)'
                            }}>
                                <h4 className="offer-ids" style={{ margin: 0 }}>
                                    Offer #{offer._id.slice(-6)}
                                </h4>
                                <span style={{ 
                                    background: offer.offerStatus === 'Active' 
                                        ? 'var(--success-color)' 
                                        : 'var(--danger-color)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {offer.offerStatus === 'Active' ? 'Available' : 'Sold'}
                                </span>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start' }}>
                                <div className="offer-lists">
                                    <div className="cards-list-items">
                                        <FaUser style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Seller:</strong> <span className="cards-spans">{offer.seller}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaEnvelope style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Email:</strong> <span className="cards-spans">{offer.email}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaBoxes style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Quantity:</strong> <span className="cards-spans">{offer.palletQty} units</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaDollarSign style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Price:</strong> <span className="cards-spans">${offer.price.toLocaleString('en-US')} USD</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaCube style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Material:</strong> <span className="cards-spans">{offer.material}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaRuler style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Dimensions:</strong> <span className="cards-spans">{offer.dimension}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaMapMarkerAlt style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Location:</strong> <span className="cards-spans">{offer.address}, {offer.state}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaCalendar style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Listed:</strong> <span className="cards-spans">{offer.dateCreated}</span>
                                    </div>
                                </div>
                                
                                <img 
                                    className="offer-img" 
                                    src={require(`../../assets/images/${offer.image}`)} 
                                    alt='sustainable-material'
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                            </div>
                            
                            <div className="offer-btn-div" style={{ marginTop: '1.5rem' }}>
                                {offer.offerStatus === 'Active' ? (
                                    <button 
                                        id="buy-btn" 
                                        className={`btns ${purchaseLoading ? 'loading' : ''}`} 
                                        onClick={() => handleSaveOffer(offer._id)}
                                        disabled={purchaseLoading}
                                    >
                                        {purchaseLoading ? 'Processing...' : (
                                            <>
                                                <FaShoppingCart style={{ marginRight: '0.5rem' }} />
                                                Purchase
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div style={{ 
                                        textAlign: 'center', 
                                        padding: '1rem',
                                        background: 'var(--danger-color)',
                                        color: 'white',
                                        borderRadius: 'var(--border-radius)',
                                        fontWeight: '600'
                                    }}>
                                        Sold Out!
                                    </div>
                                )}
                            </div>
                            
                            {error && (
                                <div className="error-message">{error.message}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default AllOffersList;