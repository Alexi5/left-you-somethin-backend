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

// need to change type according to path (instance method?)
// make sure the path is loading correctly and saving to payload images folder
const payloadConfig = {
  getterMethods: {
    payloadImage: function() {
      return `images/payloadImage/${this.id}.txt`;
    }
  },
  hooks: {
    beforeCreate: function() {
      if (this.path) {
        this.type = 'Image';
      }
    }
  }
  //convert/store the recieved payload as a path
  // hooks: {
  //     beforeCreate: function(){
  //         if(this.path === null){
  //             this.path = 'images/payloadImage/'+this.id+'.txt'
  //         }

  //     }
  // }
};

const Payload = db.define('payload', payloadSchema, payloadConfig);


module.exports = Payload;
