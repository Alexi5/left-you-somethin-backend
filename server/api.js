const api = require('express').Router();
const express = require('express');

api
  .use('/user', require('./user'))
  .use('/egg', require('./egg'))
  .use(express.static('public'))

// Send along any errors
api.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status | 500).send(err.message);
});

api.use((req, res) => res.status(404).end());

module.exports = api;

