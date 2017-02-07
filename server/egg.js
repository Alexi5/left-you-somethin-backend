const { Egg, Payload, User } = require('../db/index.js');
const router = require('express').Router();
const fs = require('fs');

  router.get('/:eggId', (req, res, next) => {
    Egg.findOne({where: {id: req.params.eggId}})
    .then(egg => res.send(egg))
  });

  router.put('/:eggId', (req, res, next) => {
    console.log('RE BODY: ', req.body.deletedByReceiver)
    Egg.findOne({where: {id: req.params.eggId}})
    .then(egg => {
      egg.update({
        pickedUp: req.body.pickedUp,
        deletedBySender: req.body.deletedBySender,
        deletedByReceiver: req.body.deletedByReceiver
      }
        , {fields: ['pickedUp','deletedBySender', 'deletedByReceiver'] }
      )
      .then( updatedEgg => {
        res.send(updatedEgg)
      })
    });
  });

  router.get('/user/:userId', (req, res, next) => {
    Egg.findAll({
    where: {$or: [{ receiverId: req.params.userId }, {senderId: req.params.userId}]},
    include: [{all: true}] })   // include: [{all: true}] //==> eagerly loads ALL user information
    .then(eggs => res.send(eggs));
  });

  //this route returns the base64 encoded goHereImage, ready to plunk into the source tag of an Image
  router.get('/goHereImage/:eggId', (req, res, next) =>{
      const readPath='images/goHereImage/'+ req.params.eggId + '.txt';
      fs.readFile(readPath, 'utf8', (err, data) => {
          if (err) throw err;
          // const formattedData = data.slice(8, -2);
          // res.json({uri: formattedData});
          res.json({uri: data});
      });
  })

//this route returns the base64 encoded payloadImage, ready to plunk into the source tag of an Image
router.get('/payloadImage/:payloadId', (req, res, next) =>{
    const readPath='images/payloadImage/'+ req.params.payloadId + '.txt';
    fs.readFile(readPath, 'utf8', (err, data) => {
        if (err) throw err;
        // const formattedData = data.slice(8, -2);
        // res.json({uri: formattedData});
        res.json({uri: data});
    });
})

router.post('/', (req, res, next) => {
    Promise.all([
      Egg.create({
        goHereText: req.body.goHereText,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        senderId: req.body.senderId,
        receiverId: req.body.recipient,
      }),
      Payload.create({
        text: req.body.payloadText,
        type: req.body.payloadType,
        path: req.body.path,
      })
    ])
    .then(([egg, payload]) => {
      egg.setPayload(payload.dataValues.id);

      console.log('req.body.goHereImage.uri', req.body.goHereImage.uri);

      // For saving goHere image
      const eggPath = 'images/goHereImage/'+ egg.dataValues.id + '.txt';
      const writeStream = fs.createWriteStream(eggPath);
            writeStream.write(req.body.goHereImage.uri);
            writeStream.end();

      // For payload images
      if (payload.type === 'Image') {
        // For saving payload image
        const payloadPath = 'images/payloadImage/'+ payload.dataValues.id + '.txt';
        const writeStream2 = fs.createWriteStream(payloadPath);
              writeStream2.write(req.body.payloadImage.uri);
              writeStream2.end();
        // TO DO
        // I don't think the payload image path is getting saved?
        // If it is, I can't figure out how/where
      }

      // Return egg
      return Egg.findOne({
        where: { id: egg.id },
        include: [{ all: true }] });
    })
    .then(newEgg => res.send(newEgg))
    .catch(err => res.send(err));
});

module.exports = router;
