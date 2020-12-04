const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Branches = require('./branch');
const Users = require('./users');

const Workers = sequelize.define("workers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthDay: {
        type: Sequelize.DATE,
        allowNull: false
    },
    ssn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    icn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rate: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    branchAddres: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
  });

  Users.hasMany(Workers);
  Branches.hasMany(Workers);

module.exports = Workers;