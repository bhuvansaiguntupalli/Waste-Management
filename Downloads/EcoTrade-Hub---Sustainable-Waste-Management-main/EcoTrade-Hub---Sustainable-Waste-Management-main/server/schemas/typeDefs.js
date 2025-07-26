const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        company: String
        username: String
        email: String
        password: String
        userType: String
        myOffers: [Offer]!
        myPurchases: [Offer]!
    }

    type Offer {
        _id: ID
        seller: String
        email: String
        palletQty: Int
        price: Float
        material: String
        dimension: String
        address: String
        state: String
        offerStatus: String
        image: String
        dateCreated: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        seller(username: String!): User
        recycler(username: String!): User
        me: User
        offers: [Offer]
        offersPerState(state: String!): [Offer]
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, company: String!, username: String!, email: String!, password: String!, userType: String!): Auth
        addOffer(palletQty: Int!, price: Float!, material: String!, dimension: String!, address: String!, state: String!, image: String): User
        addPurchase(offerId: ID!): User
        removeOffer(offerId: ID!): User
        removePurchase(offerId: ID!): User
    }
`;

module.exports = typeDefs;