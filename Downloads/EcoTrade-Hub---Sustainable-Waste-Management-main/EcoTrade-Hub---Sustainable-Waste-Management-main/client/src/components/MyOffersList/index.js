import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_OFFER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { FaUser, FaEnvelope, FaBoxes, FaDollarSign, FaCube, FaRuler, FaMapMarkerAlt, FaCalendar, FaTrash, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const MyOffersList = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || {};
    const [removeOffer, { loading: deleteLoading }] = useMutation(REMOVE_OFFER);
    console.log(me);

    const handleDeleteOffer = async (offerId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeOffer({
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
                    <p>Loading your offers...</p>
                </div>
            </section>
        );
    }

    if (!Auth.loggedIn()) {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Access Required</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    You need to be logged in to view your offers
                </p>
            </section>
        );
    } 
    
    if (Auth.getProfile().data.userType !== 'Seller') {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Seller Access Only</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    This feature is available only for Seller accounts
                </p>
            </section>
        )
    }

    return (
        <section id="myOffers-section" className="fade-in-up">
            <h2 className="section-headings">My Listed Materials</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Manage your sustainable material listings
            </p>
            
            {!me.myOffers || me.myOffers.length === 0 ? (
                <div className="section-cards" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        You haven't listed any materials yet. Create your first offer!
                    </p>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {me.myOffers?.map((myOffer) => (
                        <div className="section-cards offer-cards" key={myOffer._id}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '1rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--glass-border)'
                            }}>
                                <h4 className="offer-ids" style={{ margin: 0 }}>
                                    Offer #{myOffer._id.slice(-6)}
                                </h4>
                                <span style={{ 
                                    background: myOffer.offerStatus === 'Active' 
                                        ? 'var(--success-color)' 
                                        : 'var(--accent-color)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {myOffer.offerStatus === 'Active' ? 'Active' : 'Sold'}
                                </span>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start' }}>
                                <div className="offer-lists">
                                    <div className="cards-list-items">
                                        <FaUser style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Seller:</strong> <span className="cards-spans">{myOffer.seller}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaEnvelope style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Email:</strong> <span className="cards-spans">{myOffer.email}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaBoxes style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Quantity:</strong> <span className="cards-spans">{myOffer.palletQty} units</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaDollarSign style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Price:</strong> <span className="cards-spans">${myOffer.price.toLocaleString('en-US')} USD</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaCube style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Material:</strong> <span className="cards-spans">{myOffer.material}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaRuler style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Dimensions:</strong> <span className="cards-spans">{myOffer.dimension}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaMapMarkerAlt style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Location:</strong> <span className="cards-spans">{myOffer.address}, {myOffer.state}</span>
                                    </div>
                                    <div className="cards-list-items">
                                        <FaCalendar style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                        <strong>Listed:</strong> <span className="cards-spans">{myOffer.dateCreated}</span>
                                    </div>
                                    {myOffer.offerStatus !== 'Active' && (
                                        <div className="cards-list-items">
                                            <FaEnvelope style={{ marginRight: '0.5rem', color: 'var(--accent-color)' }} />
                                            <strong>Purchased by:</strong> 
                                            <a 
                                                href={`mailto:${myOffer.offerStatus}`}
                                                style={{ 
                                                    color: 'var(--accent-color)', 
                                                    textDecoration: 'none',
                                                    marginLeft: '0.5rem'
                                                }}
                                            >
                                                {myOffer.offerStatus}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                
                                <img 
                                    className="offer-img" 
                                    src={require(`../../assets/images/${myOffer.image}`)} 
                                    alt='sustainable-material'
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                            </div>
                            
                            <div className="offer-btn-div" style={{ marginTop: '1.5rem' }}>
                                {myOffer.offerStatus === 'Active' ? (
                                    <button 
                                        id="delete-btn" 
                                        className={`btns delete-btns ${deleteLoading ? 'loading' : ''}`} 
                                        onClick={() => handleDeleteOffer(myOffer._id)}
                                        disabled={deleteLoading}
                                    >
                                        {deleteLoading ? 'Deleting...' : (
                                            <>
                                                <FaTrash style={{ marginRight: '0.5rem' }} />
                                                Delete Offer
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '1rem',
                                        background: 'var(--success-color)',
                                        color: 'white',
                                        borderRadius: 'var(--border-radius)',
                                        fontWeight: '600'
                                    }}>
                                        <FaCheckCircle style={{ marginRight: '0.5rem' }} />
                                        Sold Successfully!
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyOffersList;