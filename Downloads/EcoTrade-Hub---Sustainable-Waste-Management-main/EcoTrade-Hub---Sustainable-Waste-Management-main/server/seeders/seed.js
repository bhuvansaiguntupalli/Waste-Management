const db = require('../config/connection');
const { User, Offer } = require('../models');
const userSeeds = require('./userSeeds.json');
const offerSeeds = require('./offerSeeds.json');

db.once('open', async () => {
    try {
        await Offer.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < offerSeeds.length; i++) {
            const { _id, seller } = await Offer.create(offerSeeds[i]);
            const user = await User.findOneAndUpdate(
                { company: seller },
                {
                    $addToSet: {
                        myOffers: _id,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('seeding done!');
    process.exit(0);
});