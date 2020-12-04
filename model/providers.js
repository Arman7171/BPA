const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');

const Providers = sequelize.define("providers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    providerName: {
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

  Users.hasMany(Providers);


module.exports = Providers;