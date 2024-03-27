const Sequelize = require("sequelize");

const sequelize = require("../utilities/database");

const Products = sequelize.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  productName: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Products;
