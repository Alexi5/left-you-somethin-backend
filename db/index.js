// const User = require('./User');
// const Egg = require('./Egg');
// const Payload = require('./Payload');

// Egg.belongsTo(User, { as: 'sender' });
// Egg.belongsTo(User, { as: 'receiver' });

// // Egg.belongsTo(Payload, {as: 'payloadId'});
// // Payload.belongsTo(Egg, {as: 'payloadId' });

// // sets eggId in payload table
// // Payload.belongsTo(Egg, {as: 'eggId' });
// // Egg.hasOne(Payload)

// // sets payload_Id in egg table
// Egg.belongsTo(Payload, { as: 'payload'});
// // Payload.belongsTo(Egg);


// module.exports = { User, Egg, Payload };


const User = require('./User');
const Egg = require('./Egg');
const Payload = require('./Payload');

Egg.belongsTo(User, { as: 'sender' });
Egg.belongsTo(User, { as: 'receiver' });

Egg.belongsTo(Payload);

// Payload.belongsTo(Egg, { as: 'eggId' });
// Egg.hasOne(Payload)

module.exports = { User, Egg, Payload };
