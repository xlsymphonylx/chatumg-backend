const User = require("./User");
const Role = require("./Role");
const GroupMessage = require("./GroupMessages");
const Group = require("./Group");

Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);
User.hasMany(GroupMessage, { foreignKey: "userId" });
GroupMessage.belongsTo(User, { foreignKey: "userId" });
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });

module.exports = {
  User,
  Role,
  Group,
  GroupMessage,
};
