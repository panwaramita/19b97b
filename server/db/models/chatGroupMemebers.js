const Sequelize = require("sequelize");
const db = require("../db");

const ChatGroupMemebers = db.define("chatgroupmembers", {
  groupMemberId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRead:{
      type:Sequelize.BOOLEAN,
      default:false,
      allowNull:false
  }
});

module.exports = ChatGroupMemebers;