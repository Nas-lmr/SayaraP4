import { Box, List, ListItem } from "@mui/material";
import {useEffect} from "react";

function RoomComponent({messages, myRef}: {messages: any[], myRef: any}) {

  useEffect(() => {
    myRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  return (
    <Box>
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
              messages !== undefined ? messages.filter(message => message !== undefined).map((message: any, index: number) => (
                   <List key={index}>
                    <ListItem>{message.senders} : {message.message}</ListItem>
                    <div ref={myRef} id="my-section"></div>
                  </List>
              )) : null
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RoomComponent;
