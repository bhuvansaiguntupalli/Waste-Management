const { AuthenticationError } = require('apollo-server-express');
const { User, Offer } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        seller: async (parent, { username }) => {
            return User.findOne({ username }).populate('myOffers');
        },
        recycler: async (parent, { username }) => {
            return User.findOne({ username }).populate('myPurchases');
        },
        me: async (parent, args, context) => {
            if (context.user && (context.user.userType === 'Seller')) {
                return User.findOne({ _id: context.user._id }).populate('myOffers');
            }
            if (context.user && (context.user.userType === 'Recycler')) {
                return User.findOne({ _id: context.user._id }).populate('myPurchases');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        offers: async () => {
            return Offer.find()
        },
        offersPerState: async (parent, { state }) => {
            return Offer.find({ state: state });
        }
    },

    Mutation: {
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { firstName, lastName, company, username, email, password, userType }) => {
            const user = await User.create({ firstName, lastName, company, username, email, password, userType });
            const token = signToken(user);
            return { token, user };
        },
        addOffer: async (parent, { palletQty, price, material, dimension, address, state, image }, context) => {
            if (context.user) {
                const offer = await Offer.create({
                    seller: context.user.company,
                    email: context.user.email,
                    palletQty, 
                    price, 
                    material, 
                    dimension, 
                    address, 
                    state, 
                    image,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { myOffers: offer._id } }
                );

                return User.findOne({ _id: context.user._id }).populate('myOffers');
            }
            throw new AuthenticationError('Please login!');
        },
        addPurchase: async (parent, { offerId }, context) => {
            if (context.user) {
                const purchase = await Offer.findOne({
                    _id: offerId,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { myPurchases: purchase._id } }
                );

                await Offer.findOneAndUpdate(
                    { _id: offerId },
                    { offerStatus: context.user.email }
                )

                return User.findOne({ _id: context.user._id }).populate('myPurchases')
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeOffer: async (parent, { offerId }, context) => {
            if (context.user) {
                const offer = await Offer.findOne({
                    _id: offerId,
                });
                
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { myOffers: offer._id } },
                );
                
                await Offer.findOneAndRemove({
                    _id: offerId,
                });

                return User.findOne({ _id: context.user._id }).populate('myOffers')
            }
            throw new AuthenticationError('Please login!');
        },
        removePurchase: async (parent, { offerId }, context) => {
            if (context.user) {
                const purchase = await Offer.findOne({
                    _id: offerId,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { myPurchases: purchase._id } },
                );

                await Offer.findOneAndUpdate(
                    { _id: offerId },
                    { offerStatus: 'Active' }
                )

                return User.findOne({ _id: context.user._id }).populate('myPurchases')
            }
            throw new AuthenticationError('Please login!');
        }
    },
};

module.exports = resolvers;