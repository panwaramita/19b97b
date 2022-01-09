const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const GroupChat =require("./groupChat");
const ChatGroupMemebers =require("./chatGroupMemebers");
// associations

User.hasMany(Conversation);
User.hasMany(GroupChat);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
GroupChat.belongsTo(User);
GroupChat.hasMany(ChatGroupMemebers);
ChatGroupMemebers.belongsTo(GroupChat);
GroupChat.hasMany(Message);
Message.belongsTo(GroupChat);
module.exports = {
  User,
  Conversation,
  Message,
  GroupChat,
  ChatGroupMemebers
};
