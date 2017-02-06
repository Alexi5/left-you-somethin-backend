const Sequelize = require('sequelize');
const db = require('./db');

const eggSchema = {
  goHereText: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Go here to find your Egg!"
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  // payloadType: {
  //   type: Sequelize.ENUM('Text', 'Image', 'Audio', 'Video'),
  //   defaultValue: 'Text',
  //   allowNull: false
  // },
  pickedUp: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  deletedBySender: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  deletedByReceiver: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
};

const eggConfig = {
  getterMethods: {
    goHereImage: function() {
      return 'images/goHereImage/'+this.id+'.txt';
    },
    payloadImage: function() {
      return 'images/payloadImage/'+this.payloadId+'.txt';
    }
  }

};

const Egg = db.define('egg', eggSchema, eggConfig);


module.exports = Egg;
