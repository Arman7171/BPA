const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');
const Providers = require('./providers');

const Products = sequelize.define("products", {
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
    saleprice: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
  });

  Users.hasMany(Products);
  Providers.hasMany(Products);

module.exports = Products;