import React from "react";
import { Box, Typography ,Badge} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextUnread: {
    fontSize: 12,
    // color: "#9CADC8",
    letterSpacing: -0.17,
    fontWeight:"bold"
  },
  readStatus: {
    fontSize: 12,
     display: "flex",
     justifyContent: "center",
     marginRight: 15,
     alignItems: "center"
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { latestMessageText, otherUser, readCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {
          conversation.readCount > 0 &&(
            <Typography className={classes.previewTextUnread}>
            {latestMessageText}
          </Typography>
          
        )}
        {
          conversation.readCount === 0 &&(
            <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
          
        )}
      </Box>
      {
        (readCount) > 0 && (
          <Badge badgeContent={readCount} color="primary" className={classes.readStatus}>
</Badge>

        )}
    </Box>
  );
};

export default ChatContent;
