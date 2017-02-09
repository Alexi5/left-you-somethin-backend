const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const volleyball = require('volleyball');
const app = express();
const db = require('../db/db');

app
  .use(volleyball)
  .use(bodyParser.raw())
  .use(bodyParser.json({limit: '50mb'}))
    .use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static('server/public'));
app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// What about serving through a static file server? Maybe have a views folder
const port = process.env.PORT || 1333;
db.sync({force: true})
  .then(() => {
    app.listen(port);
    console.log('Server is listening on port ' + port);
  })
  .catch(console.error);



module.exports = app;
