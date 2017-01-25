// const Message = require('../db/Message.js');
const router = require('express').Router();

module.exports = router
  .get('/', (req, res, next) => {
    res.send('Hit Messages Page')
    .catch(next);
    // Message.findAll()
    // .then( msgs => {
    //   res.json(msgs)
    // })
    // .catch(next)
  })
  .get('/:message', (req, res, next) => {
    res.send('Got Single Message')
    .catch(next);
  })
  .delete('/:message', (req, res, next) => {
    res.send('Delete this message')
    .catch(next);
  });

