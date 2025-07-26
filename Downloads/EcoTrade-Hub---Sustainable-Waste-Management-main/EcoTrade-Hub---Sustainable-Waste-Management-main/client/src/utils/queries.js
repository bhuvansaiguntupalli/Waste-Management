import { gql } from '@apollo/client';

export const QUERY_SELLER = gql`
    query seller($username: String!) {
        seller(username: $username) {
            _id
            fistName
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

export const QUERY_RECYCLER = gql`
    query recycler($username: String!) {
        recycler(username: $username) {
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

export const QUERY_ME = gql`
    query me {
        me {
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

export const QUERY_OFFERS = gql`
    query getOffers {
        offers {
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
`;

export const QUERY_OFFERS_PER_STATE = gql`
    query getOffersPerState($state: String!) {
        offersPerState(state: $state) {
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
`;