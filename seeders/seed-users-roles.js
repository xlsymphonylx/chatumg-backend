const bcrypt = require("bcrypt");
const { User, Role } = require("../models");

const seedUsersRoles = async () => {
  try {
    // Seed Roles
    const roles = ["user"];
    await Role.bulkCreate(roles.map((name) => ({ name })));

    // Seed User
    const adminRole = await Role.findOne({ where: { name: "user" } });
    if (adminRole) {
      const adminUser = {
        username: "user",
        password: await bcrypt.hash("1234", 10),
        roleId: adminRole.id,
      };
      await User.create(adminUser);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedUsersRoles();
