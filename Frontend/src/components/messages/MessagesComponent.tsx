import {useEffect, useRef, useState} from "react";
import './messages.css';
import {useUserContext} from "../../context/UserContext.tsx";
import {io} from "socket.io-client";
import {Rooms} from "./Rooms.tsx";

const socket = io('http://localhost:3310');
socket.on('connect', () => {
  console.log('Client connected');
});

export function MessagesComponent() {
  const [messages, setMessages]: any = useState([]);
  const {userData}: any = useUserContext();
  console.log(userData.token);
  const [activeRoom, setActiveRoom]: any = useState(0);
  const scrollRef = useRef(null);
  const [input, setInput] = useState('');
  const handleMessage = (payload: any) => {
    console.log(payload);
    setMessages(payload);
  }
  const onSubmit = (e: Event) => {
    e.preventDefault();
    const payload = {username: userData.token, message: input, roomId: activeRoom};
    socket.emit('message', payload);
    setInput('');
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
    scrollRef.current.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  return(
    <>
      <Rooms selectRoom={onChangeRoom} setMessages={(elmnt: any) => setMessages(...messages, elmnt)}/>
      <div className="chatBox">
        <div>
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
        </div>
        <form onSubmit={(event: any) => onSubmit(event) }>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter text"
                    />
          <button>envoyer</button>
        </form>
      </div>
    </>
  );
}