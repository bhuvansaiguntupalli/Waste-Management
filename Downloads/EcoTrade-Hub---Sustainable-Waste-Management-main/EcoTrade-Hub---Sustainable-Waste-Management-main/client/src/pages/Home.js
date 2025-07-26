import React from 'react';
import CircularEconomy from '../assets/images/circular-economy.webp'

const Home = () => {
    return (
        <section id="about-section" className="section-cards fade-in-up">
            <div>
                <h2 className="section-headings">Welcome to EcoTrade Hub</h2>
                <p>
                    Transform your business with sustainable trading solutions. EcoTrade Hub is a revolutionary 
                    platform that connects forward-thinking companies with eco-conscious recyclers, creating 
                    a seamless marketplace for sustainable resource exchange. Our innovative approach helps 
                    businesses monetize their surplus materials while contributing to a greener future.
                </p>
                <p>
                    By facilitating the exchange of recyclable materials at competitive prices, we're building 
                    a circular economy that benefits everyone. Companies can recover value from materials that 
                    would otherwise be discarded, while recyclers gain access to quality feedstock for their 
                    operations. Together, we're reducing waste, conserving resources, and creating economic 
                    opportunities in the sustainable marketplace.
                </p>
                <p>
                    Join thousands of businesses already participating in the sustainable revolution. Whether 
                    you're looking to sell excess materials or source quality recyclables, EcoTrade Hub provides 
                    the tools, transparency, and community you need to succeed in the green economy.
                </p>
            </div>
            <img id="home-image" src={CircularEconomy} alt="Sustainable circular economy illustration"/>
        </section>
    );
};

export default Home;