const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
var groupConversation = db.define('groupConversation', {});
// associations

User.belongsToMany(Conversation, {
  as: 'Conversations',
  through: { model: groupConversation, unique: false },
  foreignKey: 'userid'
});
Conversation.belongsToMany(User, {
  as: 'Users',
  through: { model: groupConversation, unique: false },
  foreignKey: 'conversationid'
});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  groupConversation
};
