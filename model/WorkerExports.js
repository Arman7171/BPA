const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Users = require('./users');
const Workers = require('./worker');

const WorkerExports = sequelize.define("workerExports", {
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
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  });

  
  Users.hasMany(WorkerExports);
  Workers.hasMany(WorkerExports);

module.exports = WorkerExports; 