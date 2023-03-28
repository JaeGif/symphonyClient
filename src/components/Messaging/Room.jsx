import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Message from './Message';
const socketAddress = import.meta.env.VITE_SOCKET_ADDRESS;

const socket = io.connect(`${socketAddress}`);

function Room() {
  const [body, setBody] = useState('');
  const [messages, setMessages] = useState([]);
  const sendChat = () => {
    socket.emit('message', { message: body });
  };
  useEffect(() => {
    console.log('socket changes');
    socket.on('broadcast_message', (data) => {
      setMessages([...messages, data]);
    });
  }, [socket]);
  return (
    <div>
      {messages.length !== 0 &&
        messages.map((message) => {
          <Message message={message} />;
        })}
      <input
        onChange={(e) => setBody(e.target.value)}
        placeholder='Message ...'
      />
      <button onClick={sendChat}>Send</button>
    </div>
  );
}

export default Room;
