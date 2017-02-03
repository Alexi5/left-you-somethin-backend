const User = require('./User');
const Egg = require('./Egg');
const Payload = require('./Payload');

Egg.belongsTo(User, { as: 'sender', targetKey: 'fbId' });
Egg.belongsTo(User, { as: 'receiver', targetKey: 'fbId' });

Egg.belongsTo(Payload);

module.exports = { User, Egg, Payload };
