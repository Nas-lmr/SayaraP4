import {useEffect, useState} from "react";
import './Room.css'
import {io} from "socket.io-client";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

async function loadRooms() {
  const response = await fetch('http://localhost:3310/rooms');
  return await response.json();
}


const socket = io('http://localhost:3310');
socket.on('connect', () => {
  console.log('Client connected');
});
export function Rooms({selectRoom}: any){

  const [rooms, setRooms]: any = useState([]);
  const [activeRoom, setActiveRoom] = useState(0);

  const onChangeRoom = (id: number) => {
    selectRoom(id);
    setActiveRoom(id);
  }

  useEffect((): any => {
    function handleRoom(payload: any) {
      if (payload.action === 'create') {
        setRooms((prevRoom: any) => [...prevRoom, {id: payload.roomId} ]);
      } else if (payload.action === 'delete') {
        setRooms((prevRoom: any) => prevRoom.filter((room: any) => room.id !== payload.roomId));
      }
    }
    socket.on('room', handleRoom)

    return () => {
      loadRooms().then(payload => {
        setRooms(payload.data)
        if (payload.data.length > 0) {
          setActiveRoom(payload.data[0].id)
          selectRoom(payload.data[0].id)
        }
      })
      socket.off('room', handleRoom)
    }
  }, []);
  let roomName = [];
  for (const room of rooms) {
    roomName.push(room.name);
  }
  return (
    <>
      {
        rooms.map((room: any, i: number) => (
          <ToggleButtonGroup
            sx={{height: '25%', width: '100%', margin: 'auto', pl: '12rem', mb: '5rem'}}
            color="primary"
            key={i}
            className={activeRoom === room.id ? 'active' : ''}
            aria-label="Platform"
          >
            <ToggleButton value={room.name} onClick={() => onChangeRoom(room.id)}>{room.name}</ToggleButton>
          </ToggleButtonGroup>
        ))
      }
    </>
  );
}