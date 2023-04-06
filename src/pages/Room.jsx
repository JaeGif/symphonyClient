import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../App';
import Thread from '../components/messaging/Thread';
import { useParams } from 'react-router';

const socketAddress = import.meta.env.VITE_SOCKET_ADDRESS;

function Room() {
  let { id } = useParams();
  console.log(id);
  const user = useContext(UserContext);
  const socket = io.connect(`${socketAddress}`, {
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 10,
  });
  const [messages, setMessages] = useState([]);

  // this room id would be fetched from a MONGO converstation collection
  const [room, setRoom] = useState(id);
  const joinRoom = () => {
    if (user.username !== '' && room) {
      socket.emit('join_room', room);
    }
  };
  useEffect(() => {
    joinRoom();
  }, []);

  useEffect(() => {
    socket.on('broadcast_message', (data) => {
      setMessages([...messages, data]);
    });
  }, [socket]);
  return (
    <div className='flex-1'>
      <Thread socket={socket} room={room} />
    </div>
  );
}

export default Room;
