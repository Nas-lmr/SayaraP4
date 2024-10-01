import {Box, Container, Typography} from "@mui/material";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
import {TchatErrorComponent, RoomComponent, FormComponent, SelectedRoomComponent} from "../components/messages";
import {useRoom} from "../hooks/messages/useRoom";

export default function TchatPage() {
  const {
    roomId,
    error,
    reservation,
    messages,
    newMessage,
    setNewMessage,
    userData,
    userId,
    myRef,
    activeReservation,
    setActiveReservation,
    handleChangeRoom,
    loadReservation,
    loadRoom,
    loadMessage,
    handleSendMessage
  } = useRoom();
  loadReservation();
  loadRoom();
  loadMessage();

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "6rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column'
      }}
    >
      {
        userData === null ?
          (
            <InfoProfilNotLogged
              text=" Pour voir tes messages tu dois te connecter ou bien crées un compte!"
              image="../src/assets/images/MsgImg.png"
              alt="Homme écrivant un message"
            />
          ) : (
            <>
              {error && <TchatErrorComponent error={error} />}
              { !error ?
                <SelectedRoomComponent
                  activeReservation={activeReservation}
                  setActiveReservation={setActiveReservation}
                  reservation={reservation}
                  handleChangeRoom={(id: number) => handleChangeRoom(id)}
                  myRef={myRef}
                  userId={userId.id}
                /> : null
              }
              {
                roomId !== null && !error ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                    mb={5}
                  >
                    <RoomComponent myRef={myRef} messages={messages}/>
                    <FormComponent newMessage={newMessage} onChangeCallback={(elmnt: any) => setNewMessage(elmnt.target.value)} onClickCallback={handleSendMessage}/>
                  </Box>
                ) : (<Typography variant="h6">Pas de room sélectionner</Typography>)
              }
            </>
          )
      }
    </Container>
  );
}
