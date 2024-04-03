const Sequelize = require("sequelize");

const sequelize = require("../utilities/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    alowNull: false,
  },
});

module.exports = Cart;
