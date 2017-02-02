const Sequelize = require('sequelize');
const db = require('./db');

const eggSchema = {
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

const eggConfig = {
    getterMethods: {
        goHereImage: function () {
            return 'images/goHereImage/'+this.id+'.txt';
        },
        payloadImage: function() {
            return 'images/payloadImage/'+this.payloadId+'.txt.';
        }
    }

};

const Egg = db.define('egg', eggSchema, eggConfig);


module.exports = Egg;
