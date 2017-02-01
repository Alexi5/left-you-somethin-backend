const User = require('./User');
const Egg = require('./Egg');
const Payload = require('./Payload');

Egg.belongsTo(User, { as: 'sender' });
Egg.belongsTo(User, { as: 'receiver' });

Egg.belongsTo(Payload);

// Payload.belongsTo(Egg, { as: 'eggId' });
// Egg.hasOne(Payload)

module.exports = { User, Egg, Payload };
