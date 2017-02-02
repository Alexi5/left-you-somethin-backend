const { Egg, Payload, User } = require('../db/index.js');
const router = require('express').Router();
const fs = require('fs');

  router.get('/:eggId', (req, res, next) => {
    Egg.findOne({where: {id: req.params.eggId}})
    .then(egg => res.send(egg))
  });

  router.get('/user/:userId', (req, res, next) => {
    Egg.findAll({ 
    where: {$or: [{ receiverId: req.params.userId }, {senderId: req.params.userId}]},
    include: [Payload] })
    .then(eggs => res.send(eggs));
  });

  //this route returns the base64 encoded image, ready to plunk into the source tag of an Image
  router.get('/goHereImage/:eggId', (req, res, next) =>{
      const readPath='images/goHereImage/'+ req.params.eggId + '.txt';
      fs.readFile(readPath, 'utf8', (err, data) => {
          if (err) throw err;
          const formattedData = data.slice(8, -2);
          res.json({uri: formattedData});
      });
  })

router.post('/', (req, res, next) => {
    Promise.all([
        Egg.create({
          goHereText: req.body.goHereText,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          senderId: req.body.senderId
        }),
        Payload.create({
          text: req.body.payloadText,
          type: req.body.payloadType,
        })
    ])
    .then(([egg, payload]) => {
        egg.setPayload(payload.dataValues.id);

        //for saving goHere image
        const eggPath = 'images/goHereImage/'+ egg.dataValues.id + '.txt';
        const writeStream = fs.createWriteStream(eggPath);
              writeStream.write(req.body.goHereImageBuffer);
              writeStream.end();

        //for saving payload image
        const payloadPath = 'images/payloadImage/'+ payload.dataValues.id + '.txt';
        const writeStream2 = fs.createWriteStream(payloadPath);
              writeStream2.write(req.body.payloadImageBuffer);
              writeStream2.end();

        return egg;
    })
    .then(newEgg => res.send(newEgg))
    .catch(err => res.send(err))
});

module.exports = router;
