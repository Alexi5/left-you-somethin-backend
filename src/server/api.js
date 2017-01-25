const api = require('express').Router();

api
  .use('/users', require('./users'))
  .use('/messages', require('./messages'))

// Send along any errors
api.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(500).send(err);
});

// No routes matched? 404.
api.use((req, res) => res.status(404).end());