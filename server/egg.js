const { Egg } = require('../db/index.js');
const router = require('express').Router();

  router.get('/', (req, res, next) => {
    res.send('Hit Eggs Page')
  });

  router.get('/:id', (req, res, next) => {
    Egg.findOne({where: {id: req.params.id}})
    .then(egg => res.send(egg))
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
