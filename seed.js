const db = require('./db/db');

const { User, Message } = require('./db');

async function newCreateSeeds() {
    const user1 = {
        name: 'Bob Smith',
        email: 'bob@bob.com',
    }

    const user2 = {
        name: 'Sarah Johnson',
        email: "sarah@sarah.com",
    }

    const message1 = {
        goHereImage: 'http://www.lampertlumber.com/wp-content/uploads/2015/03/Blog.png',
        goHereText: 'Find me',
        latitude: 41.888523,
        longitude: -87.634369,
        payload: 'cool, you got your first message'
    }

    const message2 = {
        goHereImage: 'Image 2, I did not load a real image',
        goHereText: 'Find me 2',
        latitude: 41.888763,
        longitude: -87.63665,
        payload: 'cool, you got your second message'
    }



    const [u1, u2] = await Promise.all([
        User.create(user1),
        User.create(user2)
    ])


    const m1 = await Message.create(message1);
    m1.setSender(u1);
    m1.setReceiver(u2);

    const m2 = await Message.create(message2);
    m2.setSender(u2);
    m2.setReceiver(u1);

    return [u1, u2];

}


db.sync({ force: true })
    .then(newCreateSeeds)
    .then(users => console.log(`Seeded database OK`))
    .catch(error => console.error(error));

module.exports = newCreateSeeds;

