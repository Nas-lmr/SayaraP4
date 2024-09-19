import {useEffect, useRef, useState} from "react";
import './messages.css';
import {useUserContext} from "../../context/UserContext.tsx";
import {io} from "socket.io-client";
import {Rooms} from "./Rooms.tsx";
import {Box, Button, Container, FormControl} from "@mui/material";

const socket = io('http://localhost:3310');
socket.on('connect', () => {
  console.log('Client connected');
});

export function MessagesComponent() {
  const [messages, setMessages]: any = useState([]);
  const {userData}: any = useUserContext();
  console.log(userData.token);
  const [activeRoom, setActiveRoom]: any = useState(0);
  const scrollRef: any = useRef(null);
  const [input, setInput] = useState('');
  const handleMessage = (payload: any) => {
    console.log(payload);
    setMessages(payload);
  }
  const onSubmit = () => {
    if(input !== '') {
      const payload = {username: userData.token, message: input, roomId: activeRoom};
      socket.emit('message', payload);
      setInput('');
    }
  }
  useEffect(() => {
    socket.on('message', handleMessage)
    return () => {
      socket.off('message', handleMessage);
    }
  }, [messages]);
  useEffect(() => {
    socket.on('message', handleMessage)
    return () => {
      socket.off('message', handleMessage)
    }
  });

  const onChangeRoom = (roomID: number) => {
    setActiveRoom(roomID);
  }
  useEffect(() => {
    if(scrollRef.current !== null) {
      scrollRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);
  return(

    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100%",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
      }}
    >
      <Rooms selectRoom={onChangeRoom} setMessages={(elmnt: any) => setMessages(...messages, elmnt)} />
      <Box
        component="section"
        sx={{
          height: "100%",
          pt: "4rem",
          pb: "3rem",
          backgroundColor: "#F4F4F4",
        }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            overflowY: 'scroll',
            height: "50px",
            pt: "4rem",
            pb: "3rem",
            backgroundColor: "#F4F4F4",
          }}>
          {
            messages
              .filter((msg: any) => msg.roomId === activeRoom)
              .map((message: any, index: number) => (
                <div key={index}>
                  {message.username} : {message.message}
                </div>
              ))
          }
          <div ref={scrollRef}></div>
        </Container>
        <FormControl sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text"
          />
          <Button
            onClick={() => onSubmit()}
            fullWidth
            variant="contained"
            color="primary"
          >Envoyer</Button>
        </FormControl>
      </Box>
    </Container>
  );
}