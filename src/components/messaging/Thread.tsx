import React, { useContext, useEffect, useState } from 'react';
import { TokenContext, UserContext } from '../../App';
import * as io from 'socket.io-client';
import Body from '../threads/Body';
import Footer from '../threads/Footer';
import Header from '../threads/Header';
import { MessageType } from '../../types/Interfaces';
import uniqid from 'uniqid';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

type ThreadProps = {
  socket: io.Socket;
  room: string | undefined;
};
// thread maps messages into a full thread with correct layout
function Thread({ socket, room }: ThreadProps) {
  // dummy user
  const user = useContext(UserContext);
  const [message, setMessage] = useState<string>();
  const [recievedMessage, setRecievedMessage] = useState<MessageType>();

  const submitMessage = async () => {
    if (message !== '') {
      // send message
      const data = {
        _id: uniqid() + Date.now(),
        room: room,
        user: user,
        message: message,
        timestamp: new Date(Date.now()).toString(),
      };
      socket.emit('send_message', data);
    }
  };
  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setRecievedMessage(data);
    });
  }, [socket, io]);
  return (
    <div>
      <Header room={room} />
      <Body room={room} recievedMessage={recievedMessage!} />
      <Footer setMessage={setMessage} submitMessage={submitMessage} />
    </div>
  );
}

export default Thread;
