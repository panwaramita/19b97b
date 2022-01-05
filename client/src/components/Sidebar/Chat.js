import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { postReadStatus } from "../../store/utils/thunkCreators";
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, postReadStatus } = props;
  const { otherUser } = conversation;
  const { latestMessageText, messages } = conversation;
  const lastMessage = messages[messages.length - 1];
  const activeConversation = props.activeConversation;

  useEffect(() => {
    if (
      lastMessage &&
      lastMessage.senderId === otherUser.id &&
      activeConversation === otherUser.username &&
      lastMessage.isRead === false
    ) {
     postReadStatus(props.conversation.id);
    }
  }, [latestMessageText])

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    postReadStatus(conversation.id);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    postReadStatus: (id) => {
      dispatch(postReadStatus(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
