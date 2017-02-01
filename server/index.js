const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('../db/db')

app
  .use(bodyParser.raw())
  .use(bodyParser.json({limit: '50mb'}))

app.use(express.static('public'))
app.use('/api', require('./api'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'))
});

// What about serving through a static file server? Maybe have a views folder

db.sync()
    .then(function(){
      app.listen(1333);
        console.log('Server is listening on port 1333');

    })
    .catch(console.error);


module.exports = app;



