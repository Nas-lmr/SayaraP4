import {useEffect, useState} from "react";
import './pageMessageComponent.css';
import {RoomListComponent} from "./subComponent/RoomListComponent.tsx";
import {
  changeRoom, leaveRoom,
  offJoinRoom,
  offMessage,
  onMessage,
  sendMessage
} from "../../services/chat/WebsocketService.ts";
import {Box, Button, List, ListItem, TextField} from "@mui/material";
import {IMessage} from "../../services/chat/IMessage.tsx";
import {useRoom} from "../../hooks/messages/useRoom.tsx";

export function PageMessageComponent() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const {user} = useRoom();
  const author = user?.username;
  const [roomId, setRoomId] = useState<number>(1);

  const handleMessage = (message: any) => {
   setMessages([...messages, message]);
  }
  const handleJoinRoom = (room: any) => {
    console.log(room.roomId);
    setRoomId(room.roomId);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(inputValue !== '') {
      console.log('SEND TO ' + roomId);
      const message ={author, content: inputValue};
      sendMessage({roomId, message});
      setInputValue('');
    }
  }
  useEffect(() => {
    onMessage(handleMessage);
    return () => {
      offMessage(handleMessage);
    }
  });

  const handleChangeRoom = (id: number) => setRoomId(id);

  useEffect(() => {
    leaveRoom(roomId);
    changeRoom(roomId);
    return () => {
      offJoinRoom(handleJoinRoom);
      setMessages([]);
    }
  }, [roomId]);
  return (
    <>
      <RoomListComponent
        selectedRoom={handleChangeRoom}
        roomId={roomId}
      />
      <Box className='pageMessageContainer'>
        <Box className='display-message' ml={5}>
          {
            messages.map((message, index) => (
              <List key={index}>
                <ListItem>{message.author} : {message.content}</ListItem>
              </List>
            ))
          }
        </Box>
        <Box className="display-form" ml={5}>
          <form onSubmit={handleSubmit}>
            <TextField type="text"
                   onChange={(e) => setInputValue(e.target.value)}
                   value={inputValue}
            />
            <Button
              variant="contained" color="primary"
              type={"submit"}

              style={{ marginTop: '10px' }}
            >Envoyer</Button>
          </form>
        </Box>
      </Box>

    </>
  );
}