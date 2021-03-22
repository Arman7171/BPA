const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');
const Branches = require('./branch');
const UserImports = require('./UserImports');
const Workers = require('./worker');

const ProductPlacement = sequelize.define("productPlacement", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    QRproduct: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productCount: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
  },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  Users.hasMany(ProductPlacement);
  Branches.hasMany(ProductPlacement);
  UserImports.hasMany(ProductPlacement);
  Workers.hasMany(ProductPlacement);

module.exports = ProductPlacement;