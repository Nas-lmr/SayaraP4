import {useEffect, useState} from "react";
import './RoomListComponent.css';
import {getRooms} from "../../../services/chat/RoomService";
import {Box, List, ListItem, Typography} from "@mui/material";
import {IPropsRoom, IRoom} from "../../../interfaces/components/chat/IRoom";

export function RoomListComponent({selectedRoom, roomId}: IPropsRoom) {
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  useEffect(() => {
    getRooms().then((data) => {
      setRoomList(data);
      selectedRoom(data.id);
    })
  }, []);

  return (
    <Box className='roomContent' ml={12}>
      {
        roomList.map((room, index) => (
          <List key={index} onClick={() => selectedRoom(room.id)} className={roomId === room.id ? "activeRoom" : ""}>
            <ListItem><Typography>{'room' + room.id.toString()}</Typography></ListItem>
          </List>
        ))
      }
    </Box>
  )
}