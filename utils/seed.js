const connection = require('../config/connection');
const { user, thought } = require('../models')
const { getRandomName , getRandomThought} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');

    await user.deleteMany({});
    await thought.deleteMany({});

    const users = [];

    for (let i=0; i<20; i++) {



    users.push({
        username,
        email,
        thoughts,
        friends,
    });
    }

    const thoughts = [];

    










await user.collection.insertMany(users);
await thought.collection.insertMany(thoughts);

console.table(users);
console.table(videos);
console.info('Seeding complete! 🌱');
process.exit(0);

});

