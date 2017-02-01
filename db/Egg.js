const Sequelize = require('sequelize');
const db = require('./db');

const eggSchema = {
    // A image will not be stored as a string. Unless this is supposed to be a file path to an image
     // Probably should be a foreign key to another model that contains a file path.
    goHereImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    goHereText: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    payloadType: {
        type: Sequelize.ENUM('Text', 'Audio', 'Video'),
        defaultValue: 'Text',
        allowNull: false
    }
};

const eggConfig = {};

const Egg = db.define('egg', eggSchema, eggConfig);


module.exports = Egg;
