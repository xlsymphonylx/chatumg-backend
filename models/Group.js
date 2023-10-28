const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assuming your database configuration is in a file named database.js

const Group = sequelize.define("Group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = Group;
