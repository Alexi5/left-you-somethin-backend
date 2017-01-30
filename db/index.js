'use strict';

const User = require('./user');
const Egg = require('./egg');


Egg.belongsTo(User, { as: 'sender'})
Egg.belongsTo(User, { as: 'receiver'})


module.exports = {
    User, Egg
};
