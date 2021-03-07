const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');
const Branches = require('./branch');

const BranchProducts = sequelize.define("branchProducts", {
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
    count: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
  });

  
  Users.hasMany(BranchProducts);
  Branches.hasMany(BranchProducts);

module.exports = BranchProducts; 