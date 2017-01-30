const Sequelize = require('sequelize');
const db = require('./db');

const eggSchema = {
    goHereImage: {
        type: Sequelize.STRING,

    },
    goHereText: {
        type: Sequelize.STRING,

    },
    latitude: {
        type: Sequelize.DECIMAL,

    },
    longitude: {
        type: Sequelize.DECIMAL,

    },
    payload: {
        type: Sequelize.STRING,

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
