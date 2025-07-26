import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OFFER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { FaBoxes, FaDollarSign, FaCube, FaRuler, FaMapMarkerAlt, FaGlobe, FaImage, FaPlus } from 'react-icons/fa';

const CreateOfferForm = () => {
    const [palletQty, setPalletQty] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [dimension, setDimension] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [image, setImage] = useState('');

    const [requiredField, setRequiredField] = useState('');

    const [addOffer, { error, loading }] = useMutation(ADD_OFFER);

    const handleChange = (event) => {
        
        const { target } = event;
        const name = target.name;
        const value = target.value;

        if (name === 'palletQty') {
            setPalletQty(Number(value));
        } if (name === 'price') {
            setPrice(Number(value));
        } if (name === 'material') {
            setMaterial(value);
        } if (name === 'dimension') {
            setDimension(value);
        } if (name === 'address') {
            setAddress(value);
        } if (name === 'state') {
            setState(value);
        } if (name === 'image') {
            setImage(value);
        }

        console.log(palletQty, price, material, dimension, address, state, image);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!palletQty || palletQty <= 0) {
            setRequiredField("Quantity is required");
            return;
        } if (!price || price <= 0) {
            setRequiredField("Price is required");
            return;
        } if (!material || material === '') {
            setRequiredField("Please select a Material");
            return;
        } if (!dimension || dimension === '') {
            setRequiredField("Please select a Dimension");
            return;
        } if (!address) {
            setRequiredField("Address is required");
            return;
        } if (!state || state === '') {
            setRequiredField("Please select a State");
            return;
        } if (!image || image === '') {
            setRequiredField("Please select a sample image for now");
            return;
        }

        try {
            const { data } = await addOffer({
                variables: { palletQty, price, material, dimension, address, state, image },
            });
            if (!data) {
                throw new Error('something did not work!');
            }
        } catch (err) {
            console.error(err);
        }

        window.location.assign('me/myOffers');
    };

    if (!Auth.loggedIn()) {
        return (
            <section className="section-cards fade-in-up">
                <h2 className="section-headings">Access Required</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    You need to be logged in to create offers
                </p>
            </section>
        );
    } if (Auth.getProfile().data.userType !== 'Seller') {
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
        <section id="createOffer-section" className="section-cards fade-in-up">
            <h2 className="section-headings">Create New Offer</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                List your sustainable materials for sale
            </p>
            <form id="createOffer-form" className="forms" onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label className="forms-labels" htmlFor="palletQty">
                            <FaBoxes style={{ marginRight: '0.5rem' }} />
                            Quantity Available
                        </label>
                        <input 
                            className="form-inputs"
                            name="palletQty"
                            type="number"
                            placeholder="Enter quantity"
                            value={palletQty}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="forms-labels" htmlFor="price">
                            <FaDollarSign style={{ marginRight: '0.5rem' }} />
                            Price per Unit
                        </label>
                        <input 
                            className="form-inputs"
                            name="price"
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label className="forms-labels" htmlFor="material">
                            <FaCube style={{ marginRight: '0.5rem' }} />
                            Material Type
                        </label>
                        <select className="form-selects" name="material" defaultValue="" onChange={handleChange}>
                            <option value="">Select material type</option>
                            <option value="HDPE">HDPE (High-Density Polyethylene)</option>
                            <option value="PP">PP (Polypropylene)</option>
                            <option value="PET">PET (Polyethylene Terephthalate)</option>
                            <option value="PVC">PVC (Polyvinyl Chloride)</option>
                            <option value="LDPE">LDPE (Low-Density Polyethylene)</option>
                        </select>
                    </div>
                    <div>
                        <label className="forms-labels" htmlFor="dimension">
                            <FaRuler style={{ marginRight: '0.5rem' }} />
                            Dimensions
                        </label>
                        <select className="form-selects" name="dimension" defaultValue="" onChange={handleChange}>
                            <option value="">Select dimensions</option>
                            <option value='48" x 40"'>48" x 40" (Standard)</option>
                            <option value='48" x 48"'>48" x 48" (Square)</option>
                            <option value='42" x 42"'>42" x 42" (Euro)</option>
                            <option value='36" x 36"'>36" x 36" (Quarter)</option>
                            <option value="Custom">Custom Size</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="address">
                        <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
                        Pickup Address
                    </label>
                    <input 
                        className="form-inputs"
                        name="address"
                        type="text"
                        placeholder="Enter pickup address"
                        value={address}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="state">
                        <FaGlobe style={{ marginRight: '0.5rem' }} />
                        State/Province
                    </label>
                    <select className="form-selects" name="state" defaultValue="" onChange={handleChange}>
                        <option value="">Select your state</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                        <option value="Florida">Florida</option>
                        <option value="New York">New York</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Georgia">Georgia</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="Michigan">Michigan</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Utah">Utah</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Nevada">Nevada</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Kansas">Kansas</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="Maine">Maine</option>
                        <option value="Montana">Montana</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="Delaware">Delaware</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="forms-labels" htmlFor="image">
                        <FaImage style={{ marginRight: '0.5rem' }} />
                        Sample Image
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginLeft: '0.5rem' }}>
                            (upload feature coming soon)
                        </span>
                    </label>
                    <select className="form-selects" name="image" defaultValue="" onChange={handleChange}>
                        <option value="">Select a sample image</option>
                        <option value="default.jpeg">Default Material</option>
                        <option value="damaged-pallets-1.jpeg">Recyclable Material 1</option>
                        <option value="damaged-pallets-2.jpeg">Recyclable Material 2</option>
                        <option value="damaged-pallets-3.jpeg">Recyclable Material 3</option>
                        <option value="damaged-pallets-4.jpeg">Recyclable Material 4</option>
                        <option value="damaged-pallets-5.jpeg">Recyclable Material 5</option>
                        <option value="damaged-pallets-6.jpeg">Recyclable Material 6</option>
                    </select>
                </div>

                {requiredField && (
                    <div className="error-message">{requiredField}</div>
                )}

                <div className="forms-btn-div">
                    <button 
                        id="createOffer-btn" 
                        className={`btns ${loading ? 'loading' : ''}`} 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Offer...' : (
                            <>
                                <FaPlus style={{ marginRight: '0.5rem' }} />
                                Create Offer
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

export default CreateOfferForm;