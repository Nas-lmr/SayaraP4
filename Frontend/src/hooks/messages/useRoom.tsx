import {useEffect, useRef, useState} from "react";
import {
  offError,
  offNewMessage,
  onError,
  onNewMessage,
  sendMessage, socket
} from "../../services/messages/socket/socketService";
import { useUserContext } from "../../context/UserContext.tsx";
import { jwtDecode } from "jwt-decode";

// This hook load all information of room
export const useRoom = () => {
  const [room, setRoom]: any = useState([]);
  const [activeReservation, setActiveReservation] = useState<boolean>(false);
  const [roomId, setRoomId]: any = useState<number | null>(null);
  const [reservation, setReservation]: any[] = useState([]);
  const [messages, setMessages]: any[] = useState([]);
  const [newMessage, setNewMessage]: any = useState('');
  const {userData} = useUserContext();
  const [error, setError]: any = useState(null);
  const myRef = useRef<HTMLElement | any>(null);
  let roomObj: any = room[0];
  let userId: any = userData !== null && jwtDecode(userData?.token);

  const handleMessage: any = ({message}: any) => {
    setMessages((prevMessages: any[]) => [...prevMessages, message]);
  };
  const loadMessage = () => {
    useEffect(() => {
      onNewMessage(handleMessage);
      return () => {
        offNewMessage(handleMessage);
      }
    }, []);
  }

  const handleSendMessage = () => {
    console.log(roomObj, 'roomObj');
    if (newMessage.trim() !== '' && userData?.token !== undefined) {
      sendMessage(roomObj.roomId, newMessage, userData?.token);
      setNewMessage('');
    }
  };
  // This hook load reservation tableName
  const loadReservation = () => {
    useEffect(() => {
      fetch('http://localhost:3310/rooms')
        .then((r) => r.json())
        .then((result: any) => {
          if(userData?.token) {
            console.log('oui')
            setReservation(result.data)
          } else {
            console.log('non');
            setReservation([]);
          }
        });
    }, []);
  }

  const handleChangeRoom = (id: number): void => {
    setRoomId(id);
  };
  const roomIdNotNull = () => roomId !== null;

  const loadRoom = () => {
    useEffect(() => {
      const handleJoinRoom = (room: any) => {
        setRoom([room]);
        setMessages(room.messages)
      };

      const sendMessage = ({message}: any) => {
        setMessages((prevMessages: any[]) => [...prevMessages, message])
      };
      if(roomIdNotNull()) {
        socket.emit('joinRoom',{ roomId: roomId.toString(), token: userData?.token })
        socket.on('joinRoom', handleJoinRoom);
        socket.on('newMessage', sendMessage);
      }
      onError((err: any) => {
        setError(err);
      });

      return () => {
        offNewMessage(({message}: any) => {
          setMessages((prevMessages: any[]) => [...prevMessages, message])
        });
        offError(onError);
      }
    });
  }
  const scrollMessage = () => {
    useEffect(() => {
      myRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
  }
  return {
    roomId,
    error,
    room,
    reservation,
    messages,
    myRef,
    userId,
    newMessage,
    setNewMessage,
    userData,
    activeReservation,
    setActiveReservation,
    handleChangeRoom,
    loadReservation,
    loadRoom,
    loadMessage,
    handleSendMessage,
    scrollMessage
  };
}

