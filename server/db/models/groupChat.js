const Sequelize = require("sequelize");
const db = require("../db");

const GroupChat = db.define("groupchat", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = GroupChat;
