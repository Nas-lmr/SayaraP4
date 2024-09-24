import { Box, List, ListItem, Typography } from "@mui/material";
import {useEffect} from "react";

function RoomComponent({room, messages, myRef, myRefObject}: {room: any; messages: any[], myRef: any, myRefObject: any}) {

  useEffect(() => {
    myRef.current?.scrollIntoView(myRefObject);
  }, [messages]);
  return (
    <Box>
        <Typography variant="h4" align='center'>Room{room.roomId}</Typography>
        <Box mt={2}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '25vh',
            overflowY: 'scroll'
          }}>
            <Box>

              {
                messages.map((message, index) => (
                  <List key={index}>
                    <ListItem>{message.senders} : {message.message}</ListItem>
                    <div ref={myRef} id="my-section"></div>
                  </List>
                ))
              }
            </Box>
          </Box>
        </Box>
    </Box>
  );
}

export default RoomComponent;
