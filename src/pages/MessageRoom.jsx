import React from 'react';
import { io } from 'socket.io-client';
function MessageRoom() {
  const socket = io('http://localhost:3001', {
    extraHeaders: { mode: 'cors' },
  });
  socket.on('connect', () => {
    console.log('hello');
    console.log(socket.id);
  });
  return <div>MessageRoom</div>;
}

export default MessageRoom;
