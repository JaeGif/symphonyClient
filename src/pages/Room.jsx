import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Thread from '../components/messaging/Thread';
const socketAddress = import.meta.env.VITE_SOCKET_ADDRESS;

function Room() {
  const socket = io.connect(`${socketAddress}`, {
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 10,
  });
  const [body, setBody] = useState('');
  const [messages, setMessages] = useState([]);

  // this room id would be fetched from a MONGO converstation collection
  const [username, setUsername] = useState('Jae');
  const [room, setRoom] = useState('room454545');
  const joinRoom = () => {
    console.log('connect');

    if (username !== '' && room) {
      socket.emit('join_room', room);
    }
  };
  useEffect(() => {
    joinRoom();
    return () => {
      /*       console.log('disconnect');
      socket.disconnect(); */
    };
  }, []);
  const sendChat = () => {
    socket.emit('message', { message: body });
  };
  useEffect(() => {
    socket.on('broadcast_message', (data) => {
      setMessages([...messages, data]);
    });
  }, [socket]);
  return (
    <div>
      <Thread socket={socket} room={room} />
    </div>
  );
}

export default Room;
