const { User } = require('../db');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('Hit Users Page')
  .catch(next);
  // User.findAll()
  // .then( users => {
  //   res.json(users)
  // })
  // .catch(next)
});

router.post('/', (req, res, next) => {
  const { firstName, lastName, fbId, email } = req.body;
  User.findOrCreate({
    where: { fbId },
    defaults: { firstName, lastName, email },
  })
    .then(() => res.status(200).send())
    .catch(next);
});

module.exports = router;
