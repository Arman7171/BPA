const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');

const Store = sequelize.define("store", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    QRproduct: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false
    },
    count: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
  });

  Users.hasMany(Store);

module.exports = Store;