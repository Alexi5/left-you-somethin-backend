const { Egg } = require('../db/index.js');
const router = require('express').Router();
const fs = require('fs');

  router.get('/:eggId', (req, res, next) => {
    Egg.findOne({where: {id: req.params.eggId}})
    .then(egg => res.send(egg))
  });

  router.get('/user/:userId', (req, res, next) => {
    Egg.findAll({ where: { receiverId: req.params.userId }})
    .then(eggs => res.send(eggs));
  });

  // router.post('/', (req, res, next) => {
  //     Egg.create({
  //       goHereText: req.body.goHereText,
  //       payloadType: req.body.payloadType,
  //       latitude: req.body.latitude,
  //       longitude: req.body.longitude
  //     })
  //         .then(egg => res.send(egg));
  // });

router.post('/', (req, res, next) => {
  console.log('got here');
    Egg.create({
        goHereText: req.body.goHereText,
        payloadType: req.body.payloadType,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
        .then(egg => {
          console.log('here is the egg ID', egg.id)
            console.log('here is req.body.goHereImage.uri', req.body.goHereImage.uri)
            console.log('here is req.body.goHereImageBuffer', req.body.goHereImageBuffer)
            fs.writeFile('../images', req.body.goHereImageBuffer, 'binary', (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
                return egg;
            })
        })
        .then(egg => res.send(egg));
});

module.exports = router;
