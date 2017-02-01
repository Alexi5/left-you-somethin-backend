const User = require('./User');
const Egg = require('./Egg');

Egg.belongsTo(User, { as: 'sender' });
Egg.belongsTo(User, { as: 'receiver' });

module.exports = { User, Egg };
