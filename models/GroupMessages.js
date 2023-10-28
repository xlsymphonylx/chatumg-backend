const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assuming your database configuration is in a file named database.js

const GroupMessage = sequelize.define("GroupMessage", {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});



module.exports = GroupMessage;
