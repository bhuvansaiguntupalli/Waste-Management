import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $company: String!, $username: String!, $email: String!, $password: String!, $userType: String!) {
        addUser(firstName: $firstName, lastName: $lastName, company: $company, username: $username, email: $email, password: $password, userType: $userType) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_OFFER = gql`
    mutation addOffer($palletQty: Int!, $price: Float!, $material: String!, $dimension: String!, $address: String!, $state: String!, $image: String) {
        addOffer(palletQty: $palletQty, price: $price, material: $material, dimension: $dimension, address: $address, state: $state, image: $image) {
            _id
            firstName
            lastName
            company
            username
            email
            userType
            myOffers {
                _id
                seller
                email
                palletQty
                price
                material
                dimension
                address
                state
                offerStatus
                image
                dateCreated
            }
        }
    }
`;

export const ADD_PURCHASE = gql`
    mutation addPurchase($offerId: ID!) {
        addPurchase(offerId: $offerId) {
            _id
            firstName
            lastName
            company
            username
            email
            userType
            myPurchases {
                _id
                seller
                email
                palletQty
                price
                material
                dimension
                address
                state
                offerStatus
                image
                dateCreated
            }
        }
    }
`;

export const REMOVE_OFFER = gql`
    mutation removeOffer($offerId: ID!) {
        removeOffer(offerId: $offerId) {
            _id
            firstName
            lastName
            company
            username
            email
            userType
            myOffers {
                _id
                seller
                email
                palletQty
                price
                material
                dimension
                address
                state
                offerStatus
                image
                dateCreated
            }
        }
    }
`;

export const REMOVE_PURCHASE = gql`
    mutation removePurchase($offerId: ID!) {
        removePurchase(offerId: $offerId) {
            _id
            firstName
            lastName
            company
            username
            email
            userType
            myPurchases {
                _id
                seller
                email
                palletQty
                price
                material
                dimension
                address
                state
                offerStatus
                image
                dateCreated
            }
        }
    }
`;