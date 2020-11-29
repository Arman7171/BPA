const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');

const Branches = sequelize.define("branches", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    branchName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    addres: {
        type: Sequelize.STRING,
        allowNull: false
      },
    vat: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
  });

  Users.hasMany(Branches);


module.exports = Branches;