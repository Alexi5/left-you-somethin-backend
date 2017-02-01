const Sequelize = require('sequelize');
const db = require('./db');

const payloadSchema = {
    content: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.ENUM('Text', 'Audio', 'Video'),
        defaultValue: 'Text',
        allowNull: false
    }
};

const payloadConfig = {};

const Payload = db.define('payload', payloadSchema, payloadConfig);


module.exports = Payload;