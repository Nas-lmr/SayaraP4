import { socket } from "../../constants/sockets";

const sendMessage = (roomId: string, message: string, token: string) => {
  socket.emit('sendMessage', { roomId, message, token });
};

const onNewMessage = (callback: any) => {
  socket.on('newMessage', callback);
};

const onError = (callback: any) => {
  socket.on('error', callback);
};

const offNewMessage = (callback: any) => {
  socket.off('newMessage', callback);
};

const offError = (callback: any) => {
  socket.off('error', callback);
};

export { socket, sendMessage, onNewMessage, onError, offNewMessage, offError };

