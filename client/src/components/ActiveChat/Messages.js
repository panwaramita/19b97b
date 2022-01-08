import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { conversation, user } = props;
  const [lastReadMessage, setLastReadMessage] = useState("");
  const getLastReadMessage = () => {
    for (let i = conversation.messages.length - 1; i > 0; i--) {
      if (conversation.messages[i].isRead === true && conversation.messages[i].senderId === user.id) {
        setLastReadMessage(conversation.messages[i].id);
        return conversation.messages[i].id;
      }
    }
  }
  useEffect(() => {
    console.log("conversation.readCount", conversation.readCount);
    getLastReadMessage()
  }, [conversation.sendMessagetoReceiver])
  return (
    <Box>
      {
        conversation.messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === user.id ? (
            lastReadMessage === message.id ? (
              <SenderBubble key={message.id} text={message.text} time={time} status={message.isRead} otherUser={conversation.otherUser} />
            )
              :(
                <SenderBubble key={message.id} text={message.text} time={time} status={0} otherUser={conversation.otherUser} />
              )
            ) : 
               (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={conversation.otherUser} />
               );
        })}
    </Box>
  );
};

export default Messages;
