export const addMessageToStore = (state, payload) => {
  const { message} = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const newConvo = { ...convo }
      newConvo.latestMessageText = message.text;
      newConvo.messages.splice(newConvo.messages.length, 0, message);
      newConvo.sendMessagetoReceiver=1;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo }
      newConvo.id = message.conversationId;
      newConvo.latestMessageText = message.text;
      newConvo.messages.splice(newConvo.messages.length, 0, message);
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addMessageToStoreReadCount = (state, message, sender, currentActiveConversation) => {
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.splice(convoCopy.messages.length, 0, message);
      convoCopy.latestMessageText = message.text;
      if (sender !== currentActiveConversation) {
        convoCopy.readCount++;
      };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const resetReadCount = (state, conversationId) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.readCount = 0;
      convoCopy.messages.forEach(element => {
        element.isRead=true;
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};
export const resetReadStatus = (state, conversationId) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.forEach(element => {
        element.isRead=true;
      });
      convoCopy.readCount = 0;
      convoCopy.sendMessagetoReceiver=0;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

