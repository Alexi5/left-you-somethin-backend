const db = require('./db/db');

const { User, Egg, Payload } = require('./db');

async function newCreateSeeds() {
    const user1 = {
        id: 10154346204722379,
        firstName: 'Rebekah',
        lastName: 'Klemm',
        email: 'rebekah_klemm@yahoo.com',
    }

    const user2 = {
        id: 10209420763697676,
        firstName: 'Jean',
        lastName: 'Chung',
        email: "jxchung@gmail.com",
    }

    const user3 = {
        id: 10201419031655447,
        firstName: 'Alexis',
        lastName: 'Jennings',
        email: "alexis.m.jenn@gmail.com",
    }

    const egg1 = {
        goHereImage: 'http://www.lampertlumber.com/wp-content/uploads/2015/03/Blog.png',
        goHereText: 'Find me',
        latitude: 41.888523,
        longitude: -87.634369,
    }

    const egg2 = {
        goHereImage: 'Image 2, I did not load a real image',
        goHereText: 'Find me 2',
        latitude: 41.888763,
        longitude: -87.63665,
    }

    const egg3 = {
        goHereImage: 'Image 3, I did not load a real image',
        goHereText: 'Find me 3',
        latitude: 41.888763,
        longitude: -87.63665,
    }

    const pay1 = {
        text: 'cool, you got your first egg'
    }

    const pay2 = {
        text: 'cool, you got your second egg'
    }

    const pay3 = {
        text: 'message from Alexis'
    }

    const [u1, u2, u3] = await Promise.all([
        User.create(user1),
        User.create(user2),
        User.create(user3)
    ])


    const e1 = await Egg.create(egg1);
    e1.setSender(u1);
    e1.setReceiver(u2);

    const e2 = await Egg.create(egg2);
    e2.setSender(u2);
    e2.setReceiver(u3);

    const e3 = await Egg.create(egg3);
    e3.setSender(u3);
    e3.setReceiver(u1);


    //OLD
    // //sets payload_id in egg table
    // const p1 = await Payload.create(pay1)
    // e1.setPayload(p1)

    // const p2 = await Payload.create(pay2)
    // e2.setPayload(p2)


    // // const p1 = await Payload.create(pay1)
    // // p1.setEgg(e1)

    // // const p2 = await Payload.create(pay2)
    // // p2.setEgg(e2)

    //new
    const p1 = await Payload.create(pay1)
    e1.setPayload(p1)

    const p2 = await Payload.create(pay2)
    e2.setPayload(p2)

    const p3 = await Payload.create(pay3)
    e3.setPayload(p3)

    // const p1 = await Payload.create(pay1)
    // p1.setEgg(e1)

    // const p2 = await Payload.create(pay2)
    // p2.setEgg(e2)

    return [u1, u2, u3];


}


db.sync({ force: true })
    .then(newCreateSeeds)
    .then(users => console.log(`Seeded database OK`))
    .catch(error => console.error(error));

module.exports = newCreateSeeds;

