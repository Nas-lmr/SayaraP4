import {Box, Button, List, ListItem, Typography} from "@mui/material";
import {replaceRoomName} from "../../utils";
import {ISelectedRoomComponent} from "../../interfaces/components/messages";

function SelectedRoomComponent({activeReservation, setActiveReservation, reservation, handleChangeRoom, myRef, userId}: ISelectedRoomComponent) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '25%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => setActiveReservation(!activeReservation)}
            variant='contained'
            color={!activeReservation ? 'success' : 'error'}
          >{!activeReservation ? 'Open communications de réservation' : 'Close Communications de réservation'}</Button>
        </Box>
        {activeReservation ?
          <Box>
            {
              reservation.map((reservation: any, index: number) => {
                return reservation.users.includes(userId) ? (
                  <List key={index} onClick={() => handleChangeRoom(reservation.roomId)}>
                    <ListItem><Typography align={'center'} width={'100%'}>{replaceRoomName(reservation.name)}</Typography></ListItem>
                    <div ref={myRef} id="my-section"></div>
                  </List>
                ) : null
              })
            }
          </Box> : null}
      </Box>
    </Box>
  )
}

export default SelectedRoomComponent;
