const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: false
  },
  chatId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  isGroupChat:{
    type:Sequelize.BOOLEAN,
    allowNull:true,
    default:false
  }
});

module.exports = Message;
