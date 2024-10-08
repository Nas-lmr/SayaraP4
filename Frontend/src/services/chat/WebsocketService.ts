import {socket} from "../../constants/sockets";

// sendMessage => Send new message
const sendMessage = (websocketMessage: {roomId: number; message: {content: string; author: string}}) => socket.emit('message', websocketMessage);
const onMessage = (callback: any) => socket.on('newMessage', (data) => {
 // console.log("Received message", data);
  callback(data);
});
const offMessage = (callback: any) => socket.off('newMessage', callback);

// changeRoom / offJoinRoom => Join room
const changeRoom = (roomId: number) => socket.emit('joinRoom', {roomId});
const leaveRoom = (roomId: number) => socket.emit('leaveRoom', {roomId});
const onJoinRoom = (callback: any) => socket.on('joinRoom', callback);
const offJoinRoom = (callback: any) => socket.off('joinRoom', callback);
const offLeaveRoom = () => socket.off('leaveRoom');


export { sendMessage, changeRoom, onJoinRoom, offJoinRoom, offMessage, leaveRoom, onMessage, offLeaveRoom};