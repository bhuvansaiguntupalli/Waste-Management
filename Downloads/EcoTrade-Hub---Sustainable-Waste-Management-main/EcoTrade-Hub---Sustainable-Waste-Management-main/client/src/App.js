import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import MyOffersList from './components/MyOffersList';
import CreateOfferForm from './components/CreateOfferForm';
import AllOffersList from './components/AllOffersList';
import MyPurchasesList from './components/MyPurchasesList';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <main className="main-container">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/signup"
              element={<Signup />}
            />
            <Route 
              path="/me"
              element={<Profile />}
            />
            <Route 
              path="/me/myOffers"
              element={<MyOffersList />}
            />
            <Route 
              path="/createOffer"
              element={<CreateOfferForm />}
            />
            <Route 
              path="/allOffers"
              element={<AllOffersList />}
            />
            <Route 
              path="/me/myPurchases"
              element={<MyPurchasesList />}
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;