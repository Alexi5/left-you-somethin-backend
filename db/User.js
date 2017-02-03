const Sequelize = require('sequelize');
const db = require('./db');

const userSchema = {
  fbId: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};

const userConfig = {
  getterMethods: {
    fullName: () => this.firstname + ' ' + this.lastname
  }
};

const User = db.define('user', userSchema, userConfig);

module.exports = User;

