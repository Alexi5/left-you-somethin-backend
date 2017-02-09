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

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

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
       return Promise.all([egg.setPayload(payload.dataValues.id), payload]);
    })
    .then(([egg, payload]) => {
        return Promise.all([
          egg,
          writeFile(`images/goHereImage/${egg.dataValues.id}.txt`, req.body.goHereImage.uri),
          writeFile(`images/payloadImage/${egg.dataValues.id}.txt`, req.body.payloadImage.uri)
        ]);

    })
    .then(([egg]) =>
        Egg.findOne({
            where: {id: egg.id},
            include: [{all: true}]
        })
    )
    .then(newEgg => res.send(newEgg))
    .catch(next);
});

module.exports = router;
