const Sequelize = require('sequelize');

const sequelize = new Sequelize('chatapp', 'root', 'Muzammil@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;