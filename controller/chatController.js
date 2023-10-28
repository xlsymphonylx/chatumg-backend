const { Group, GroupMessage } = require("../models"); // Assuming your models are in the correct path

const chatController = {
  // Get all groups
  getAllGroups: async (req, res) => {
    try {
      const groups = await Group.findAll();
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new group
  createGroup: async (req, res) => {
    const { name, description } = req.body;
    try {
      const group = await Group.create({ name, description });
      res.json(group);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all group messages for a specific group
  getAllGroupMessages: async (req, res) => {
    const groupId = req.params.groupId;
    try {
      const groupMessages = await GroupMessage.findAll({
        where: { groupId },
      });
      res.json(groupMessages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new group message
  createGroupMessage: async (req, res) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { message, imageUrl, groupId } = req.body;

    try {
      const groupMessage = await GroupMessage.create({
        message,
        imageUrl,
        userId: userId,
        groupId,
      });

      // Emit the message to the group
      io.to(`group_${groupId}`).emit("groupMessage", groupMessage);

      res.json(groupMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = chatController;
