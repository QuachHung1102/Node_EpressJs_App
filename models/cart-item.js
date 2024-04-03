const Sequelize = require("sequelize");

const sequelize = require("../utilities/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.DataTypes.INTEGER,
  },
});

module.exports = CartItem;
