const db = require('./db/db');

const { User, Egg, Payload } = require('./db');

async function newCreateSeeds() {
  const user1 = {
    fbId: '10154346204722379',
    firstName: 'Rebekah',
    lastName: 'Klemm',
    email: 'rebekah_klemm@yahoo.com',
  };

  const user2 = {
    fbId: '10209420763697676',
    firstName: 'Jean',
    lastName: 'Chung',
    email: 'jxchung@gmail.com',
  };

  const user3 = {
    fbId: '10201419031655447',
    firstName: 'Alexis',
    lastName: 'Jennings',
    email: 'alexis.m.jenn@gmail.com',
  };

  const user4 = {
    fbId: '132571497257037',
    firstName: 'Chump',
    lastName: 'Bumpsley',
    email: 'north.andy@gmail.com',
  };

  const egg1 = {
    goHereImage: 'http://www.lampertlumber.com/wp-content/uploads/2015/03/Blog.png',
    goHereText: 'Find me',
    latitude: 41.888423,
    longitude: -87.634369,
  };

  const egg2 = {
    goHereImage: 'Image 2, I did not load a real image',
    goHereText: 'Find me 2',
    latitude: 41.888563,
    longitude: -87.634369,
  };

  const egg3 = {
    goHereImage: 'Image 3, I did not load a real image',
    goHereText: 'Find me 3',
    latitude: 41.888623,
    longitude: -87.638369,
  };

  const egg4 = {
    goHereImage: 'Image 3, I did not load a real image',
    goHereText: 'Find me 4',
    latitude: 41.888663,
    longitude: -87.635369
  };

  const egg5 = {
    goHereImage: 'Not an image',
    goHereText: 'Find me 5',
    latitude: 41.888323,
    longitude: -87.635469
  };

  const pay1 = {
    text: 'cool, you got your first egg Jean'
  };

  const pay2 = {
    text: 'cool, you got your second egg Alexis'
  };

  const pay3 = {
    text: 'message to Alexis'
  };

  const pay4 = {
    text: 'image payload test',
    path: 'images/payloadImage/4.txt',
    type: 'Image'
  };

  const pay5 = {
    text: 'egg for Chump'
  };

  const [u1, u2, u3, u4] = await Promise.all([
    User.create(user1),
    User.create(user2),
    User.create(user3),
    User.create(user4)
  ]);

  const e1 = await Egg.create(egg1);
  e1.setSender(u1);
  e1.setReceiver(u2);

  const e2 = await Egg.create(egg2);
  e2.setSender(u2);
  e2.setReceiver(u3);

  const e3 = await Egg.create(egg3);
  e3.setSender(u3);
  e3.setReceiver(u1);

  const e4 = await Egg.create(egg4);
  e4.setSender(u2);
  e4.setReceiver(u3);

  const e5 = await Egg.create(egg5);
  e5.setSender(u3);
  e5.setReceiver(u4);


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
  const p1 = await Payload.create(pay1);
  e1.setPayload(p1);

  const p2 = await Payload.create(pay2);
  e2.setPayload(p2);

  const p3 = await Payload.create(pay3);
  e3.setPayload(p3);

  const p4 = await Payload.create(pay4);
  e4.setPayload(p4);

  const p5 = await Payload.create(pay5);
  e5.setPayload(p5);

  // const p1 = await Payload.create(pay1)
  // p1.setEgg(e1)

  // const p2 = await Payload.create(pay2)
  // p2.setEgg(e2)

  return [u1, u2, u3, u4];
}

db.sync({ force: true })
    .then(newCreateSeeds)
    .then(users => console.log(`Seeded database OK`))
    .catch(error => console.error(error));

module.exports = newCreateSeeds;
