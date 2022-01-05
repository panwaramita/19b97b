import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setNewMessageReadCount
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
  // store.dispatch(setNewMessage(data.message, data.sender));
  const fullStore = store.getState();
  const currentActiveConversation = fullStore.activeConversation;
  store.dispatch(
    setNewMessageReadCount(
      data.message,
      data.sender.username,
      currentActiveConversation
    )
  );
  });
});

export default socket;
