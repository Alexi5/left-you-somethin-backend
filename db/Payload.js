const Sequelize = require('sequelize');
const db = require('./db');

const payloadSchema = {
    text: {
        type: Sequelize.STRING,
        allowNull: true
    },
    path: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.ENUM('Text', 'Image', 'Audio', 'Video'),
        defaultValue: 'Text',
        allowNull: false
    }
};

const payloadConfig = {};

const Payload = db.define('payload', payloadSchema, payloadConfig);


module.exports = Payload;