const Sequelize = require('sequelize');
const db = require('./db');

const userSchema = {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const userConfig = {};

const User = db.define('user', userSchema, userConfig);

module.exports = User;

