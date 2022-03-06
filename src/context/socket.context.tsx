import { createContext, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  roomId?: string;
  roomList?: string[];
}

const socket = io(SOCKET_URL);
const SocketContext = createContext<Context>({ socket, setUsername: () => false });

function SocketsProvider(props: any) {
  socket.on('connection', () => {
    console.log(socket.id);
  });

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomList, setRoomList] = useState<string[]>([]);

  return <SocketContext.Provider value={{ socket, username, setUsername, roomId, roomList }} {...props} />;
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;