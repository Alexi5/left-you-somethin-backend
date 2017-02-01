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
  User.findOrCreate({
    where: { email: req.body.email },
    defaults: { name: req.body.displayName },
  })
    .then(([user, created]) => res.send(user.id))
    .catch(next);
});

module.exports = router;
