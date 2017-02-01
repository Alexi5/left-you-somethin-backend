const { Egg, Payload, User } = require('../db/index.js');
const router = require('express').Router();
const fs = require('fs');

  router.get('/:eggId', (req, res, next) => {
    Egg.findOne({where: {id: req.params.eggId}})
    .then(egg => res.send(egg))
  });

  router.get('/user/:userId', (req, res, next) => {
    Egg.findAll({ where: { receiverId: req.params.userId }, include: [ Payload ] })
    .then(eggs => res.send(eggs));
  });

  // router.post('/', (req, res, next) => {
  //   Egg.create({
  //     goHereImage: 'http://placeholder.com',
  //     goHereText: req.body.goHereText,
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude
  //     })
  //   .then(egg => {
  //     egg.createPayload({
  //       type: req.body.payloadType,
  //       content: req.body.payload
  //     })
  //     .then(egg => res.send(egg));
  //   });
  // });

router.post('/', (req, res, next) => {
console.log('-----------------------> got into add egg route')
    Promise.all([
        User.findOne({where:{id: req.body.senderId}}),
        Egg.create({
            goHereImage: null,
            goHereText: req.body.goHereText,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            payloadType: req.body.payloadType,
        })
    ])
        .then(([user, egg]) => {
            const path = 'images/goHereImage/'+ egg.id + '.txt';
            const writeStream = fs.createWriteStream(path);
                    writeStream.write(req.body.goHereImageBuffer);
                    writeStream.end();
                    egg.setSender(1);
            return egg;
        })
        .then(egg => res.send(egg));
});

module.exports = router;
