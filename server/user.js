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
    where: { id: req.body.uid },
    defaults: { name: req.body.displayName, email: req.body.email },
  })
    .then(() => res.status(200).send())
    .catch(next);
});

module.exports = router;
