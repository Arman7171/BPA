const Sequelize = require("sequelize");

const sequelize = new Sequelize("bpa", "root", "1234", {
    dialect: "mysql",
    host: "127.0.0.1"
});

module.exports = sequelize;