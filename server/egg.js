const { Egg } = require('../db/index.js');
const router = require('express').Router();


  router.get('/:eggId', (req, res, next) => {
    Egg.findOne({where: {id: req.params.eggId}})
    .then(egg => res.send(egg))
  });

  router.get('/user/:userId', (req, res, next) => {
    Egg.findAll({ where: { receiverId: req.params.userId }})
    .then(eggs => res.send(eggs));
  });

  router.post('/', (req, res, next) => {
      Egg.create({
        goHereText: req.body.goHereText,
        payloadType: req.body.payloadType,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
          .then(egg => res.send(egg));
  });

module.exports = router;
