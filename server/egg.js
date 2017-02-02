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
        User.findAll({where:{id: req.body.senderId}}),
        Egg.create({
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
        .then(egg => res.send(egg))
        .catch(err => res.send(err))
});

module.exports = router;
