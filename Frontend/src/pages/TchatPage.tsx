import {Box, Container} from "@mui/material";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
import { useUserContext } from "../context/UserContext";
import {useEffect, useRef, useState} from "react";
import {
  offError,
  onError,
  sendMessage,
  socket
} from "../services/socket/socketService";
import {TchatErrorComponent, RoomComponent, FormComponent} from "../components/messages";

export default function TchatPage() {
  const [room, setRoom]: any = useState([]);
  const [messages, setMessages]: any[] = useState([]);
  const [newMessage, setNewMessage]: any = useState('');
  const [error, setError]: any = useState(null);
  const { userData }: any = useUserContext();
  const myRef = useRef<HTMLElement | any>(null);
  const [myRefObject, setMyRefObject]: any = useState({behavior: 'smooth'});
  let roomObj: any = room[0];

  useEffect(() => {
    const handleJoinRoom = (room: any) => {
      setRoom([room]);
      setMessages(room.messages)
    };

    const sendMessage = ({message}: any) => {
      setMessages((prevMessages: any[]) => [...prevMessages, message])
    };

    socket.emit('joinRoom', { roomId: '1', token: userData.token });
    socket.on('joinRoom', handleJoinRoom);
    socket.on('newMessage', sendMessage);
    onError((err: any) => {
      setError(err);
    });

    return () => {
      socket.off('newMessage', ({message}: any) => {
        setMessages((prevMessages: any[]) => [...prevMessages, message])
      });
      offError(onError);
    }
  });

  useEffect(() => {
    const handleMessage: any = ({message}: any) => {
      setMessages((prevMessages: any[]) => [...prevMessages, message])
    };
    socket.on('newMessage', handleMessage);
    return () => {
      socket.off('newMessage', handleMessage);
    }
  }, [messages]);


  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(roomObj.roomId, newMessage, userData.token);
      setMyRefObject({
        behavior: 'instant',
      });
      setNewMessage('');
      setInterval(() =>
        setMyRefObject({
          behavior: 'smooth',
        }), 500)
    }
  };
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
              {
                roomObj && (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <RoomComponent room={roomObj} messages={messages} myRef={myRef} myRefObject={myRefObject} />
                    <FormComponent newMessage={newMessage} onChangeCallback={(elmnt: any) => setNewMessage(elmnt.target.value)} onClickCallback={handleSendMessage}/>
                  </Box>
                )
              }
            </>
          )
      }
    </Container>
  );
}
