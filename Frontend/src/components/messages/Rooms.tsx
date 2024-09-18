import {useEffect, useState} from "react";
import './Room.css'
import {io} from "socket.io-client";


async function removeRoom(id: number) {
  const response = await fetch('http://localhost:3310/rooms/' + id, {method: 'DELETE'});
  await response.json()
}

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

  const onRemoveRoom = (id: number) => {
    removeRoom(id).then();
    fetch(`http://localhost:3500/rooms/${id}`, { method: 'DELETE' }).then(res => res.json());
  }

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

  return (
    <>
      <ul>
        {rooms !== undefined ? rooms.map((room: any, i: number) => (
          <li key={i} className={room.id === activeRoom ? 'active': ''}>
            <span onClick={() => onChangeRoom(room.id)}>{room.name}</span>
            <span onClick={() => onRemoveRoom(room.id)}>&#10060;</span>
          </li>
        )) : null}
      </ul>
    </>
  )
}