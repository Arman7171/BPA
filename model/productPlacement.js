const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');
const Branches = require('./branch');
const Products = require('./products');
const Providers = require('./providers')

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
    productCount: {
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
  Providers.hasMany(ProductPlacement);
  Products.hasMany(ProductPlacement);

module.exports = ProductPlacement;